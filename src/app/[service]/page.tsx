import { notFound } from "next/navigation";
import { services } from "@/config/website";
import ServicePage from "@/components/ServicePage";
import { pageMetadata } from "@/lib/metadata";

export const dynamicParams = false;
export function generateStaticParams() {
  return services.map((s) => ({ service: s.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;
  const s = services.find((s) => s.slug === service);
  return s ? pageMetadata(s.title, s.description, `/${s.slug}/`, s.image) : {};
}
export default async function Page({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;
  const s = services.find((s) => s.slug === service);
  if (!s) notFound();
  return <ServicePage service={s} />;
}
