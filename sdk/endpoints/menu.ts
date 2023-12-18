import { z } from 'zod';
import { MenuCategory, MenuCategoryIcon } from '../types/objects';

export const MenuCategoryCreateRequestSchema = z.object({
  name: z.string(),
  slug: z.string(),
  menuId: z.string(),
});

export type MenuCategoryCreateRequest = z.infer<
  typeof MenuCategoryCreateRequestSchema
>;
export type MenuCategoryCreateResponse = {
  ok: boolean;
  result: MenuCategory;
};

const icons: MenuCategoryIcon[] = [
  'DEFAULT',
  'BURGER',
  'PIZZA',
  'ROLLS',
  'SUSHI',
  'WOK',
  'CAKE',
  'LASAGNA',
  'DRINK',
];

export const MenuCategoryUpdateRequestSchema = z.object({
  name: z.string().optional(),
  slug: z.string().optional(),
  icon: z.enum(icons as [string, ...string[]]),
});

export type MenuCategoryUpdateRequest = z.infer<
  typeof MenuCategoryUpdateRequestSchema
>;
export type MenuCategoryUpdateResponse = {
  ok: boolean;
  result: MenuCategory;
};
