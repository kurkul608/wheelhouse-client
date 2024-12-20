import { Page } from "@/components/Page";

export default function Car({ params }: { params: { slug: string } }) {
  return <Page>Car {params.slug}</Page>;
}
