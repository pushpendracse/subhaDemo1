import { MembershipSection } from "@/components/sections/membership-section";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Les Amis de la Maison",
  description: "Join our private membership — Membre, Habitué or Connaisseur. Reserved tables, cellar access, and personalised hospitality.",
};
export default function MembershipPage() {
  return <div className="min-h-screen pt-16"><MembershipSection /></div>;
}
