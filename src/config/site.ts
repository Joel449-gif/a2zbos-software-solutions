/**
 * A2ZBOS company details.
 *
 * Every value wrapped in square brackets is a PLACEHOLDER awaiting real company
 * information. Replace it here and it updates everywhere on the site.
 * Leave `whatsappNumber` empty until a real number is supplied — WhatsApp
 * buttons stay disabled (and say so) while it is empty.
 */
export const site = {
  name: "A2ZBOS",
  parent: "AtoZ Computers",
  tagline: "Software solutions by AtoZ Computers",
  contact: {
    email: "atozcomputerschennai@gmail.com",
    phone: "+91 98415 66770",
    headOffice: "No: 54, Cholambedu Main Road, Ambattur, Chennai - 600053",
    branchOffice:
      "No 2/3, Pillaiyar Koil Cross Street, Solapuram Main Road, Thirumullaivoyal, Chennai - 600062",
    hours: "[Add business hours]",
  },
  /** International format, digits only, e.g. "919876543210". Empty = not configured. */
  whatsappNumber: "919841566770",
} as const;

export const isPlaceholder = (value: string) => /^\[.*\]$/.test(value.trim());

export const whatsappConfigured = () => /^\d{8,15}$/.test(site.whatsappNumber);

export function whatsappLink(message: string): string | null {
  if (!whatsappConfigured()) return null;
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** `tel:` href for the configured phone number, or null while it is a placeholder. */
export function phoneLink(): string | null {
  if (isPlaceholder(site.contact.phone)) return null;
  return `tel:${site.contact.phone.replace(/[^\d+]/g, "")}`;
}

/** `mailto:` href for the configured email address, or null while it is a placeholder. */
export function emailLink(): string | null {
  if (isPlaceholder(site.contact.email)) return null;
  return `mailto:${site.contact.email}`;
}

export const navItems = [
  { to: "/", label: "Home" },
  { to: "/solutions", label: "Solutions" },
  { to: "/products", label: "Products" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;
