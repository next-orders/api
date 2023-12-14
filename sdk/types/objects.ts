// Main Entity
export type Shop = {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
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

export type Product = {
  id: string;
  type: ProductType;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  variants?: ProductVariant[];
  rating: number;
  score: number;
  isAvailableForPurchase: boolean;
};

export type ProductType = 'PRODUCTION' | 'READY' | 'INGREDIENT';

export type Employee = {
  id: string;
  firstName: string;
  lastName: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date | null;
  permissions: EmployeePermission[];
};

export type EmployeePermission = {
  id: string;
  type: EmployeePermissionType;
};

export type EmployeePermissionType =
  | 'READ_CLIENTS'
  | 'EDIT_CLIENTS'
  | 'READ_MEDIA'
  | 'EDIT_MEDIA'
  | 'READ_CHANNELS'
  | 'EDIT_CHANNELS'
  | 'READ_PRODUCTS'
  | 'EDIT_PRODUCTS'
  | 'READ_MENUS'
  | 'EDIT_MENUS';

export type EmployeeContact = {
  id: string;
  type: EmployeeContactType;
};

export type EmployeeContactType = 'EMAIL';

export type Client = {
  id: string;
  firstName: string;
  lastName: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  level: number;
  gender: Gender;
  emotion: number;
  loyalty: number;
  avatarId: string;
  traits: ClientTrait[];
};

export type ClientTrait = {
  id: string;
  type: ClientTraitType;
  createdAt: Date;
  updatedAt: Date;
};

export type ClientTraitType =
  | 'BLANK'
  | 'ORDERLY'
  | 'SPONTANEOUS'
  | 'COLD'
  | 'WELL_FED'
  | 'SATISFIED'
  | 'PICKY'
  | 'CAUTIOUS';

export type Channel = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  currencyCode: CurrencyCode;
  languageCode: LanguageCode;
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

export type LanguageCode = 'EN' | 'RU';

export type CurrencyCode = 'USD' | 'RUB';

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
  icon: string | null;
};

export type ProductVariant = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  sku: string | null;
  weightUnit: WeightUnit;
  weightValue: number;
  onSale: boolean;
  gross: number;
  net: number | null;
  tax: number | null;
  per100gEnergy: number | null;
  per100gProtein: number | null;
  per100gFat: number | null;
  per100gCarbohydrate: number | null;
  seoTitle: string | null;
  seoDescription: string | null;
  media: ProductMedia[];
  category: MenuCategory;
};

export type WeightUnit = 'G' | 'KG' | 'OZ' | 'LB';

export type ProductMedia = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  media: Media;
};

export type Checkout = {
  id: string;
  deliveryMethod: CheckoutDeliveryMethod;
  shippingPrice: number;
  totalPrice: number;
  lines: CheckoutLine[];
};

export type CheckoutDeliveryMethod = 'DELIVERY' | 'WAREHOUSE';

export type CheckoutLine = {
  id: string;
  quantity: number;
  productVariant: ProductVariant;
};

export type AvatarParams = {
  gender?: Gender;
  emotion?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | number;
  clothing?: 'amber' | 'green' | 'blue' | 'teal' | 'pink' | 'violet';
};

export type Gender = 'MALE' | 'FEMALE' | 'UNKNOWN';
