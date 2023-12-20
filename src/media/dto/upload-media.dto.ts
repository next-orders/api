import { createZodDto } from 'nestjs-zod';
import { UploadMediaRequestSchema } from '@/../sdk/endpoints';

export class UploadMediaDto extends createZodDto(UploadMediaRequestSchema) {}
