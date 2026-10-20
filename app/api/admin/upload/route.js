import { NextResponse } from "next/server";
import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { requireAdminApi } from "@/lib/auth";
import { handle, jsonError } from "@/lib/api";
import { MAX_UPLOAD_BYTES, detectImageType, uploadDir } from "@/lib/uploads";

export const POST = handle(async (request) => {
  const { response } = await requireAdminApi();
  if (response) return response;

  let form;
  try {
    form = await request.formData();
  } catch {
    return jsonError("Please choose an image to upload.");
  }
  const file = form.get("file");
  if (!file || typeof file === "string") return jsonError("Please choose an image to upload.");
  if (file.size > MAX_UPLOAD_BYTES) return jsonError("Image is too large (max 5 MB).");

  const buffer = Buffer.from(await file.arrayBuffer());
  const ext = detectImageType(buffer);
  if (!ext) return jsonError("Only PNG, JPG, WEBP or GIF images are allowed.");

  const dir = uploadDir();
  await fs.mkdir(dir, { recursive: true });
  const name = `${Date.now().toString(36)}-${crypto.randomBytes(6).toString("hex")}.${ext}`;
  await fs.writeFile(path.join(dir, name), buffer);

  return NextResponse.json({ url: `/uploads/${name}` }, { status: 201 });
});
