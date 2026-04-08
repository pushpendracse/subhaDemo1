export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  priceNote?: string;
  image: string;
  category: string;
  isSignature?: boolean;
  allergens?: string[];
  courses?: number;
  duration?: string;
}

export interface Experience {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  priceNote: string;
  image: string;
  availability: string;
  badge: string;
  badgeColor: string;
}

export interface MembershipTier {
  id: string;
  name: string;
  nameEn: string;
  price: string;
  monthlyPrice: string;
  description: string;
  color: string;
  popular?: boolean;
  perks: string[];
}

export interface Review {
  id: number;
  name: string;
  location: string;
  rating: number;
  comment: string;
  occasion: string;
  verified: boolean;
  date: string;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  neighbourhood: string;
  phone: string;
  email: string;
  hours: { dinner: string; lunch: string; closed: string };
  features: string[];
  image: string;
  lat: number;
  lng: number;
  isOpen: boolean;
  isPrimary: boolean;
}
