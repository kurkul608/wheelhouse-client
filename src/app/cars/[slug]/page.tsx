import { Page } from "@/components/Page";
import { getCarCard } from "@/actions/carCard/get";
import { Section } from "@telegram-apps/telegram-ui";

export default async function Car({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const carCard = await getCarCard(slug);

  return (
    <Page>
      <Section>
        <div>{carCard.externalId}</div>
      </Section>
    </Page>
  );
}
