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
  type: 'PRODUCTION' | 'READY' | 'INGREDIENT';
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

export type EmployeePermission = {
  id: string;
  type: 'READ_CLIENTS' | 'EDIT_CLIENTS' | 'READ_MEDIA' | 'EDIT_MEDIA';
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
    | 'BLANK'
    | 'ORDERLY'
    | 'SPONTANEOUS'
    | 'COLD'
    | 'WELL_FED'
    | 'SATISFIED'
    | 'PICKY'
    | 'CAUTIOUS';
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
  accentTextColor: string;
  accentButtonColor: string;
  accentGradientFrom: string | null;
  accentGradientTo: string | null;
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
  icon: MenuCategoryIcon;
};

export type MenuCategoryIcon =
  | 'DEFAULT'
  | 'BURGER'
  | 'CAKE'
  | 'PIZZA'
  | 'ROLL'
  | 'SUSHI'
  | 'WOK';

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

export type AvatarParams = {
  gender?: 'MALE' | 'FEMALE' | 'UNKNOWN';
  emotion?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | number;
  clothing?: 'amber' | 'green' | 'blue' | 'teal' | 'pink' | 'violet';
};
