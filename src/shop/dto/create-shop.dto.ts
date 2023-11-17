import { createZodDto } from 'nestjs-zod';
import { ShopCreateRequestSchema } from '@api-sdk';

export class CreateShopDto extends createZodDto(ShopCreateRequestSchema) {}
