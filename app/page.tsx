import HomeClient from "./HomeClient";
import type { PortfolioAllData } from "@/types";

async function getPortfolioData(): Promise<PortfolioAllData | null> {
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://portofolio-irpanzy.vercel.app/api";

  try {
    const res = await fetch(`${apiUrl}/portfolio/all`, {
      next: { revalidate: 600 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data || null;
  } catch {
    return null;
  }
}

export default async function Home() {
  const initialData = await getPortfolioData();
  return <HomeClient initialData={initialData} />;
}
