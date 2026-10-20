import Image from "next/image";

/**
 * next/image wrapper for images that come from the admin panel.
 * Uploaded (/uploads/...) and external (https://...) images skip the optimizer
 * so they work without extra next.config setup.
 */
export default function SmartImage({ src, alt = "", ...props }) {
  if (!src) return null;
  const unoptimized = /^https?:\/\//i.test(src) || src.startsWith("/uploads/");
  return <Image src={src} alt={alt} unoptimized={unoptimized} {...props} />;
}
