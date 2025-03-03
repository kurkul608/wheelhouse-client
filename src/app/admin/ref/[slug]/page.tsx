import { RefLink } from "@/components/RefLink/Reflink";
import { Page } from "@/components/Page";

export default async function RefCode({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
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
