import { permanentRedirect } from "next/navigation";

// The blog has been redesigned as "The Inner Library"
export default function BlogPage() {
  permanentRedirect("/inner-library");
}
