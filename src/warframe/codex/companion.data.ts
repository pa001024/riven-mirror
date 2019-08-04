import { CompanionData } from "./companion.i";

const Sentinels: CompanionData[] = [
  { id: "Carrier", health: 200, shield: 100, armor: 50, tags: ["Sentinel"], polarities: "yyyyd" },
  { id: "Carrier Prime", className: "Carrier", health: 400, shield: 100, armor: 150, tags: ["Sentinel"], polarities: "yyyydr" },
  { id: "Dethcube", health: 200, shield: 100, armor: 50, tags: ["Sentinel"], polarities: "yyyy" },
  { id: "Diriga", health: 350, shield: 50, armor: 50, tags: ["Sentinel"], polarities: "yyyy" },
  { id: "Djinn", health: 200, shield: 100, armor: 50, tags: ["Sentinel"], polarities: "yyyy-" },
  { id: "Helios", health: 200, shield: 100, armor: 50, tags: ["Sentinel"], polarities: "yyyyd" },
  { id: "Helios Prime", className: "Helios", health: 250, shield: 100, armor: 100, tags: ["Sentinel"], polarities: "yyyyd" },
  { id: "Oxylus", health: 200, shield: 100, armor: 50, tags: ["Sentinel"], polarities: "yyyyd" },
  { id: "Prisma Shade", className: "Shade", health: 350, shield: 100, armor: 75, tags: ["Sentinel"], polarities: "yyyy-" },
  { id: "Shade", health: 350, shield: 50, armor: 50, tags: ["Sentinel"], polarities: "yyyy" },
  { id: "Taxon", health: 200, shield: 100, armor: 50, tags: ["Sentinel"], polarities: "yyyy" },
  { id: "Wyrm", health: 200, shield: 100, armor: 50, tags: ["Sentinel"], polarities: "yyyy" },
  { id: "Wyrm Prime", className: "Wyrm", health: 225, shield: 300, armor: 150, tags: ["Sentinel"], polarities: "yyyy" }
];

const Animals: CompanionData[] = [
  { id: "Adarza Kavat", health: 40, shield: 70, armor: 50, tags: ["Wild"] },
  { id: "Chesa Kubrow", health: 125, shield: 75, armor: 50, tags: ["Wild"] },
  { id: "Helminth Charger", health: 95, shield: 85, armor: 50, tags: ["Wild"] },
  { id: "Huras Kubrow", health: 75, shield: 125, armor: 50, tags: ["Wild"] },
  { id: "Raksa Kubrow", health: 100, shield: 100, armor: 50, tags: ["Wild"] },
  { id: "Sahasa Kubrow", health: 125, shield: 75, armor: 50, tags: ["Wild"] },
  { id: "Smeeta Kavat", health: 50, shield: 60, armor: 50, tags: ["Wild"] },
  { id: "Sunika Kubrow", health: 110, shield: 90, armor: 50, tags: ["Wild"] }
];

export const _companionData = [...Sentinels, ...Animals];
