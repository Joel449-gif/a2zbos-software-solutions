import type { AreaKey } from "./solutions";
import type { InterestValue } from "@/lib/enquiry";

/**
 * Product catalogue. Add a new object to `products` and it appears on the
 * Products page and gets its own detail page at /products/<slug>.
 *
 * `ownership` keeps third-party products clearly separate from A2ZBOS's own.
 */
export type ProductStatus = "available" | "planned";
export type ProductOwnership = "third-party" | "a2zbos";

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  area: AreaKey;
  status: ProductStatus;
  ownership: ProductOwnership;
  /** Who owns/develops the product, when it is third-party. */
  maker?: string;
  officialUrl?: string;
  capabilities: { title: string; detail: string }[];
  idealUsers: string[];
  platforms?: string[];
  howWeHelp: string[];
  interest: InterestValue;
  sourceNote?: string;
}

export const products: Product[] = [
  {
    slug: "mybillbook",
    name: "myBillBook",
    tagline: "Smarter billing. Simpler business.",
    description:
      "myBillBook is GST billing and business management software for small businesses in India. It brings invoicing, inventory, payment collection and reports together in one app. A2ZBOS distributes myBillBook and helps businesses choose, set up and start using it.",
    category: "Billing & Invoicing",
    area: "business",
    status: "available",
    ownership: "third-party",
    maker: "FloBiz",
    officialUrl: "https://mybillbook.in/",
    capabilities: [
      {
        title: "GST & non-GST invoicing",
        detail: "Invoices with auto-tax and HSN/SAC codes, plus quotations, purchase orders and POS billing.",
      },
      {
        title: "Inventory management",
        detail: "Real-time stock tracking with low-stock alerts, batch tracking and expiry management.",
      },
      {
        title: "Payment collection",
        detail: "WhatsApp and SMS payment reminders with UPI links, shared ledgers and outstanding-dues tracking.",
      },
      {
        title: "GST compliance",
        detail: "GSTR-1, GSTR-2 and GSTR-3B reports, e-invoicing and e-way billing support.",
      },
      {
        title: "Reports & dashboard",
        detail: "Cash flow, sales and outstanding-payment reports, with Tally export.",
      },
      {
        title: "Marketing & loyalty",
        detail: "Online catalogue, WhatsApp and SMS campaigns, and customer loyalty points.",
      },
    ],
    idealUsers: [
      "Retail shops",
      "Distributors",
      "Wholesalers",
      "Manufacturers",
      "Kirana stores",
      "Pharmacies",
      "Electronics & mobile shops",
      "Apparel stores",
      "Hardware shops",
      "Restaurants",
    ],
    platforms: ["Android", "iOS", "Web", "PC"],
    howWeHelp: [
      "Understand your business and confirm myBillBook is the right fit",
      "Guide you through getting started and purchasing arrangements",
      "Help with initial setup so your team can begin billing",
      "Stay in touch as your needs grow",
    ],
    interest: "business-software",
    sourceNote:
      "Product capabilities summarised from the official myBillBook website. Features and availability may vary by plan — confirm current details at mybillbook.in.",
  },
];

/** Solution areas A2ZBOS intends to expand its product portfolio into. Not launched products. */
export const exploringAreas: { area: AreaKey; title: string; note: string }[] = [
  {
    area: "customer",
    title: "Customer management",
    note: "CRM, lead management and WhatsApp engagement tools.",
  },
  {
    area: "digital",
    title: "Digital business tools",
    note: "Portals, dashboards and online selling.",
  },
  {
    area: "automation",
    title: "Automation & AI",
    note: "Workflow automation and AI-assisted business tools.",
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
