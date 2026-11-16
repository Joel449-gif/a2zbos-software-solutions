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
    email: "[Add business email]",
    phone: "[Add phone number]",
    address: "[Add office address]",
    hours: "[Add business hours]",
  },
  /** International format, digits only, e.g. "919876543210". Empty = not configured. */
  whatsappNumber: "",
} as const;

export const isPlaceholder = (value: string) => /^\[.*\]$/.test(value.trim());

export const whatsappConfigured = () => /^\d{8,15}$/.test(site.whatsappNumber);

export function whatsappLink(message: string): string | null {
  if (!whatsappConfigured()) return null;
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const navItems = [
  { to: "/", label: "Home" },
  { to: "/solutions", label: "Solutions" },
  { to: "/products", label: "Products" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;
