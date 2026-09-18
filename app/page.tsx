import HomeClient from "./HomeClient";
import type { PortfolioAllData } from "@/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getPortfolioData(): Promise<PortfolioAllData | null> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) return null;

  try {
    const res = await fetch(`${apiUrl}/portfolio/all`, {
      cache: "no-store",
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
