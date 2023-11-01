import { createZodDto } from 'nestjs-zod';
import { UploadMediaRequestSchema } from '@api-sdk';

export class UploadMediaDto extends createZodDto(UploadMediaRequestSchema) {}
