import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Mail, MessageCircle, Phone } from "lucide-react";
import { requireAdminPage } from "@/lib/auth";
import { getOrder, STATUS_LABELS } from "@/lib/orders";
import { toInt } from "@/lib/validation";
import { formatDate } from "@/lib/format";
import { formatPrice, formatWorkshopDate } from "@/components/workshops/workshops";
import { Badge, Card } from "@/components/admin/ui";
import OrderActions from "@/components/admin/OrderActions";

export const metadata = { title: "Order" };

const TONES = { pending: "amber", confirmed: "green", cancelled: "neutral" };

/** 0300 1234567 → 923001234567 for WhatsApp links */
function whatsappNumber(phone) {
  const d = String(phone).replace(/\D/g, "");
  if (d.startsWith("0")) return `92${d.slice(1)}`;
  return d;
}

function Row({ label, children }) {
  return (
    <div className="flex flex-col gap-0.5 py-2.5 sm:flex-row sm:gap-4">
      <dt className="w-40 shrink-0 text-xs font-semibold uppercase tracking-wider text-[#8A8478] sm:pt-0.5">{label}</dt>
      <dd className="min-w-0 text-sm">{children}</dd>
    </div>
  );
}

export default async function OrderDetailPage({ params }) {
  await requireAdminPage();
  const { id } = await params;
  const o = toInt(id) ? await getOrder(toInt(id)) : null;
  if (!o) notFound();

  return (
    <>
      <Link href="/admin/orders" className="mb-3 inline-flex items-center gap-1 text-sm text-[#8A8478] hover:text-[#1C2E22]">
        <ArrowLeft className="h-4 w-4" /> All orders
      </Link>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <h1 className="font-mono text-2xl font-bold sm:text-3xl">{o.reference}</h1>
        <Badge tone={TONES[o.status]}>{STATUS_LABELS[o.status] || o.status}</Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card className="p-5">
            <h2 className="mb-2 font-cormorant text-xl font-bold">Customer</h2>
            <dl className="divide-y divide-[#EFE8DB]">
              <Row label="Name">{o.full_name}</Row>
              <Row label="Email">
                <a href={`mailto:${o.email}`} className="inline-flex items-center gap-1.5 text-[#A67539] hover:underline">
                  <Mail className="h-3.5 w-3.5" /> {o.email}
                </a>
              </Row>
              <Row label="Phone">
                <span className="flex flex-wrap gap-3">
                  <a href={`tel:${o.phone}`} className="inline-flex items-center gap-1.5 text-[#A67539] hover:underline">
                    <Phone className="h-3.5 w-3.5" /> {o.phone}
                  </a>
                  <a
                    href={`https://wa.me/${whatsappNumber(o.phone)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#A67539] hover:underline"
                  >
                    <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
                  </a>
                </span>
              </Row>
              {o.notes && (
                <Row label="Customer notes">
                  <span className="whitespace-pre-line">{o.notes}</span>
                </Row>
              )}
            </dl>
          </Card>

          <Card className="p-5">
            <h2 className="mb-2 font-cormorant text-xl font-bold">Booking</h2>
            <dl className="divide-y divide-[#EFE8DB]">
              <Row label="Workshop">
                {o.workshop_id ? (
                  <Link href={`/admin/workshops/${o.workshop_id}`} className="font-medium hover:text-[#A67539]">
                    {o.workshop_title}
                  </Link>
                ) : (
                  <span>
                    {o.workshop_title} <span className="text-xs text-[#8A8478]">(deleted)</span>
                  </span>
                )}
              </Row>
              <Row label="Workshop date">{formatWorkshopDate(o.workshop_date_str)}</Row>
              <Row label="Seats">{o.seats}</Row>
              <Row label="Price per seat">{formatPrice(o.unit_price)}</Row>
              <Row label="Total">
                <span className="font-cormorant text-2xl font-bold">{formatPrice(o.total_amount)}</span>
              </Row>
              <Row label="Payment">Bank transfer</Row>
              <Row label="Booked on">{formatDate(o.created_at)}</Row>
              <Row label="Last updated">{formatDate(o.updated_at)}</Row>
            </dl>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <OrderActions order={{ id: o.id, status: o.status, admin_note: o.admin_note || "" }} />
        </div>
      </div>
    </>
  );
}
