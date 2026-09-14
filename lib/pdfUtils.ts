const pdfPageCountCache = new Map<string, number>();

export function getPdfPageImageUrl(
  url?: string,
  page = 1,
  title?: string
): string {
  if (!url) return "";
  const cleanUrl = url.split("?")[0].split("#")[0];

  let rotation = "";
  if (url.includes("?")) {
    const searchParams = new URLSearchParams(url.split("?")[1].split("#")[0]);
    const rt = searchParams.get("rt") || searchParams.get("rotate");
    if (rt) {
      rotation = rt;
    } else {
      const tr = searchParams.get("tr");
      const match = tr?.match(/rt-(\d+)/);
      if (match) rotation = match[1];
    }
  }

  if (cleanUrl.includes("imagekit.io")) {
    const trParts = ["w-1600", `pg-${page}`];
    if (rotation && rotation !== "0") {
      trParts.push(`rt-${rotation}`);
    }
    return `${cleanUrl}/ik-thumbnail.jpg?tr=${trParts.join(",")}`;
  }

  return cleanUrl;
}

export async function getPdfTotalPages(url?: string): Promise<number> {
  if (!url) return 1;
  const cleanUrl = url.split("?")[0].split("#")[0];

  if (pdfPageCountCache.has(cleanUrl)) {
    return pdfPageCountCache.get(cleanUrl)!;
  }

  if (!cleanUrl.includes("imagekit.io")) {
    return 1;
  }

  try {
    const checkPage = async (page: number): Promise<boolean> => {
      try {
        const res = await fetch(
          `${cleanUrl}/ik-thumbnail.jpg?tr=w-50,pg-${page}`,
          { method: "HEAD" }
        );
        return res.ok;
      } catch {
        return false;
      }
    };

    const [p2, p3, p4, p5] = await Promise.all([
      checkPage(2),
      checkPage(3),
      checkPage(4),
      checkPage(5),
    ]);

    let count = 1;
    if (p5) {
      count = 5;
      for (let p = 6; p <= 10; p++) {
        if (await checkPage(p)) count = p;
        else break;
      }
    } else if (p4) count = 4;
    else if (p3) count = 3;
    else if (p2) count = 2;
    else count = 1;

    pdfPageCountCache.set(cleanUrl, count);
    return count;
  } catch {
    return 1;
  }
}
