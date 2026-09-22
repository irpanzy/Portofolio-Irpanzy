import HomeClient from "./HomeClient";
import type { PortfolioAllData } from "@/types";

export const revalidate = 60;

async function getPortfolioData(): Promise<PortfolioAllData | null> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) return null;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const res = await fetch(`${apiUrl}/portfolio/all`, {
      next: { revalidate: 60, tags: ["portfolio-all"] },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

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
