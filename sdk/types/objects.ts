// Main Entity
export type Shop = {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  domains?: Domain[];
  channels: Channel[];
};

// Shop Entities
export type Domain = {
  id: string;
  host: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Media = {
  id: string;
  alt: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  level: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  category: Category;
  variants?: ProductVariant[];
  rating: number;
  score: number;
  description: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  isAvailableForPurchase: boolean;
};

export type Channel = {
  id: string;
  slug: string;
  name: string;
  currencyCode: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  domainId?: string | null;
};

// Channel Entities
export type Menu = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type MenuCategory = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  slug: string;
};

export type ProductVariant = {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  sku?: string | null;
  weightUnit?: string | null;
  weightValue?: number | null;
  onSale: boolean;
  currency?: string | null;
  gross?: number | null;
  net?: number | null;
  tax?: number | null;
  media?: ProductMedia[];
};

export type ProductMedia = {
  id: string;
  mediaId: string;
  media?: Media;
  createdAt: Date;
  updatedAt: Date;
};

export type Checkout = {
  id: string;
  lines: CheckoutLine[];
};

export type CheckoutLine = {
  id: string;
  quantity: number;
  variant: ProductVariant;
};
