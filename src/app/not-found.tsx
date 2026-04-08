import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 pt-24">
      <p className="section-eyebrow mb-5">Page Not Found</p>
      <h1 className="text-8xl font-light text-[var(--text-primary)] mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>404</h1>
      <p className="text-[var(--text-muted)] text-sm mb-10 max-w-sm leading-relaxed">
        We could not find the page you were looking for. Perhaps you were searching for our menu or reservations?
      </p>
      <Link href="/"><Button variant="gold" size="md">Return Home</Button></Link>
    </div>
  );
}
