import { RefLink } from "@/components/RefLink/Reflink";
import { Page } from "@/components/Page";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return {
    title: `Реферальный код ${slug}`,
  };
}

export default async function RefCode({ params }: Props) {
  const { slug } = await params;

  return (
    <Page>
      <div
        style={{ backgroundColor: "var(--tgui--secondary_bg_color)" }}
        className={"h-[calc(100vh-62px)] overflow-auto"}
      >
        {slug ? <RefLink id={slug} /> : null}
      </div>
    </Page>
  );
}
