import { createZodDto } from 'nestjs-zod';
import { ShopCreateRequestSchema } from '@/../sdk/endpoints';

export class CreateShopDto extends createZodDto(ShopCreateRequestSchema) {}
