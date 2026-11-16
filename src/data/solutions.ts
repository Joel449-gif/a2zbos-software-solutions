import type { LucideIcon } from "lucide-react";
import { Receipt, Users, Globe, Sparkles } from "lucide-react";
import type { InterestValue } from "@/lib/enquiry";

export type AreaKey = "business" | "customer" | "digital" | "automation";

export interface SolutionArea {
  id: string;
  key: AreaKey;
  index: string;
  name: string;
  short: string;
  headline: string;
  summary: string;
  description: string;
  offerings: string[];
  problems: string[];
  useCases: string[];
  intent: string;
  interest: InterestValue;
  icon: LucideIcon;
}

export const solutions: SolutionArea[] = [
  {
    id: "business-software",
    key: "business",
    index: "01",
    name: "Business Software",
    short: "Billing, POS & inventory",
    headline: "Run the counter, the stockroom and the books from one place.",
    summary:
      "Billing, invoicing, point of sale and inventory tools that keep day-to-day operations accurate and quick.",
    description:
      "Everyday business software that replaces manual registers and scattered spreadsheets. We help you choose suitable tools, set them up around how you work, and get your team comfortable using them.",
    offerings: [
      "Billing & invoicing",
      "Point of Sale (POS)",
      "Inventory & stock management",
      "Business management software",
    ],
    problems: [
      "Slow, error-prone manual billing",
      "No clear view of what is in stock",
      "Payments and dues tracked in notebooks",
      "Reports that take hours to put together",
    ],
    useCases: [
      "A retail counter moving to digital billing",
      "A distributor tracking stock across items",
      "An owner wanting daily sales visibility",
    ],
    intent: "I want to bill faster and track stock",
    interest: "business-software",
    icon: Receipt,
  },
  {
    id: "customer-management",
    key: "customer",
    index: "02",
    name: "Customer Management",
    short: "CRM, leads & WhatsApp",
    headline: "Never lose track of a lead, a customer or a conversation.",
    summary:
      "CRM, lead management and WhatsApp-based engagement to organise every customer relationship.",
    description:
      "Tools and workflows that bring enquiries, follow-ups and customer conversations into one organised system, so your team always knows who to talk to next.",
    offerings: [
      "Customer Relationship Management (CRM)",
      "Lead management",
      "WhatsApp-based customer engagement",
      "Communication & workflow management",
    ],
    problems: [
      "Leads forgotten after the first call",
      "Customer history spread across phones",
      "No consistent follow-up process",
      "Hard to see which enquiries convert",
    ],
    useCases: [
      "A sales team managing an enquiry pipeline",
      "A business engaging customers on WhatsApp",
      "A service firm tracking client communication",
    ],
    intent: "I want to manage leads and customers",
    interest: "crm",
    icon: Users,
  },
  {
    id: "digital-solutions",
    key: "digital",
    index: "03",
    name: "Digital Solutions",
    short: "Websites, apps & portals",
    headline: "A digital presence built to work as hard as you do.",
    summary:
      "Websites, custom web applications, business portals, dashboards and e-commerce built around your goals.",
    description:
      "From a credible company website to a custom portal for your team or customers, we design and build digital products that are fast, clear and easy to maintain.",
    offerings: [
      "Website design & development",
      "Custom web applications",
      "Business portals & dashboards",
      "E-commerce solutions",
    ],
    problems: [
      "No website, or one that undersells the business",
      "Processes that outgrew off-the-shelf tools",
      "Data locked in places nobody can see",
      "No way to sell or take orders online",
    ],
    useCases: [
      "A company website that builds trust",
      "An internal dashboard for daily operations",
      "An online catalogue or store",
    ],
    intent: "I need a website or web application",
    interest: "web-development",
    icon: Globe,
  },
  {
    id: "automation-ai",
    key: "automation",
    index: "04",
    name: "Business Automation & AI",
    short: "Automation, AI & integrations",
    headline: "Let software handle the repetitive work.",
    summary:
      "Process automation, AI-powered tools, workflow optimisation and integrations between the systems you already use.",
    description:
      "We look at where time is lost to repetitive tasks and connect the right tools — automations, integrations and practical AI — to give that time back to your team.",
    offerings: [
      "Business process automation",
      "AI-powered business tools",
      "Workflow optimisation",
      "Software integrations",
    ],
    problems: [
      "Staff re-typing the same data into multiple tools",
      "Approvals and hand-offs that stall",
      "Systems that don't talk to each other",
      "Unsure where AI could genuinely help",
    ],
    useCases: [
      "Automatic follow-ups and reminders",
      "Connecting billing, CRM and messaging",
      "AI assistance for routine documents",
    ],
    intent: "I want to automate repetitive work",
    interest: "automation-ai",
    icon: Sparkles,
  },
];

export const areaColor: Record<AreaKey, string> = {
  business: "bg-area-business",
  customer: "bg-area-customer",
  digital: "bg-area-digital",
  automation: "bg-area-automation",
};

export const areaText: Record<AreaKey, string> = {
  business: "text-area-business",
  customer: "text-area-customer",
  digital: "text-area-digital",
  automation: "text-area-automation",
};
