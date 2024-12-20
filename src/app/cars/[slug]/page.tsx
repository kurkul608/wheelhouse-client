import { Page } from "@/components/Page";

export default async function Car({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const par = await params;
  return <Page>Car {par.slug}</Page>;
}
