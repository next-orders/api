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
  level: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Product = {
  id: string;
  type: 'INGREDIENT' | 'READY' | 'PRODUCTION' | string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  category: Category;
  variants?: ProductVariant[];
  rating: number;
  score: number;
  isAvailableForPurchase: boolean;
};

export type Client = {
  id: string;
  firstName: string;
  lastName: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  level: number;
  gender: 'UNKNOWN' | 'MALE' | 'FEMALE';
  emotion: number;
  loyalty: number;
  avatarId: string;
  traits: ClientTrait[];
};

export type ClientTrait = {
  id: string;
  type:
    | 'ORDERLY'
    | 'SPONTANEOUS'
    | 'COLD'
    | 'WELL-FED'
    | 'SATISFIED'
    | 'PICKY'
    | 'CAUTIOUS'
    | 'BLANK'
    | string;
  createdAt: Date;
  updatedAt: Date;
};

export type Channel = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  currencyCode: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  domainId?: string | null;
  menus: Menu[];
};

// Channel Entities
export type Menu = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  categories: MenuCategory[];
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
  slug: string;
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
  seoTitle: string | null;
  seoDescription: string | null;
  media: ProductMedia[];
  category: MenuCategory;
};

export type ProductMedia = {
  id: string;
  alt: string;
  url: string;
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
