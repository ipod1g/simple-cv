import "@fortawesome/fontawesome-svg-core/styles.css";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/context/ThemeContext";
import Layout from "@/components/Layout";
import NotionSection from "@/components/content/NotionSection";
import Background from "@/components/common/Background";
import type { TNotionData } from "@/types";

export default function PortfolioApp({
  notionDataArray,
}: {
  notionDataArray: TNotionData[];
}) {
  return (
    <ThemeProvider defaultTheme="dark">
      <Analytics />
      <Layout>
        <>
          <NotionSection notionDataArray={notionDataArray} />
          <Background />
        </>
      </Layout>
    </ThemeProvider>
  );
}
