import { z } from 'zod';
import { MenuCategory } from '../types/objects';

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
