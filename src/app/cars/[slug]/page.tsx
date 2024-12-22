import { Page } from "@/components/Page";
import { getCarCard } from "@/actions/carCard/get";
import { Section } from "@telegram-apps/telegram-ui";
import { PhotoGallery } from "@/components/PhotoGallery/PhotoGallery";

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
        <div className={"h-[340px]"}>
          <PhotoGallery
            photoUrls={
              carCard.photos?.length ? carCard.photos : carCard.importedPhotos
            }
          />
        </div>
      </Section>
    </Page>
  );
}
