// Smart Fallback tech product images for ISURI COMPUTERS

const FALLBACK_IMAGES = {
  cpu: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=600&auto=format&fit=crop&q=80",
  ram: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=600&auto=format&fit=crop&q=80",
  ssd: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&auto=format&fit=crop&q=80",
  motherboard: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80",
  gpu: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&auto=format&fit=crop&q=80",
  laptop: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&auto=format&fit=crop&q=80",
  headphone: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
  monitor: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=80",
  mouse: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&auto=format&fit=crop&q=80",
  default: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80"
};

export function getProductFallbackImage(product) {
  if (!product) return FALLBACK_IMAGES.default;
  
  const name = (product.name || "").toLowerCase();
  const category = (product.category || "").toLowerCase();

  if (name.includes("intel") || name.includes("ryzen") || name.includes("processor") || name.includes("core i")) {
    return FALLBACK_IMAGES.cpu;
  }
  if (name.includes("ram") || name.includes("corsair") || name.includes("ddr4") || name.includes("ddr5") || name.includes("vengeance")) {
    return FALLBACK_IMAGES.ram;
  }
  if (name.includes("ssd") || name.includes("nvme") || name.includes("samsung") || name.includes("storage")) {
    return FALLBACK_IMAGES.ssd;
  }
  if (name.includes("motherboard") || name.includes("tuf") || name.includes("asus") || name.includes("b650")) {
    return FALLBACK_IMAGES.motherboard;
  }
  if (name.includes("rtx") || name.includes("gtx") || name.includes("geforce") || name.includes("graphics") || name.includes("nvidia")) {
    return FALLBACK_IMAGES.gpu;
  }
  if (name.includes("laptop") || name.includes("macbook")) {
    return FALLBACK_IMAGES.laptop;
  }
  if (name.includes("headphone") || name.includes("earphone") || name.includes("earbuds")) {
    return FALLBACK_IMAGES.headphone;
  }

  return FALLBACK_IMAGES.default;
}

export function handleImageError(e, product) {
  const fallback = getProductFallbackImage(product);
  if (e.target.src !== fallback) {
    e.target.src = fallback;
  }
}
