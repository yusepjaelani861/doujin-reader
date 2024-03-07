import MangaSection from "@/components/Sections/MangaSection";
import useSources from "@/hooks/useSources";
import MainLayout from "@/layouts/MainLayout";
import Head from "next/head";

export default function Home() {
  const { sources } = useSources()
  return (
    <MainLayout>
      <Head>
        <title>Doujin Reader</title>
      </Head>
      <div className="mt-4 w-full">
        {sources.map((item, index) => (
          <MangaSection key={index} source={item.url} />
        ))}
      </div>
    </MainLayout>
  );
}
