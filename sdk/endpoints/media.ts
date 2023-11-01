import { z } from 'zod';

export const UploadMediaRequestSchema = z.object({
  alt: z.string(),
  file: z.any(),
});

export type UploadMediaRequest = z.infer<typeof UploadMediaRequestSchema>;
export type UploadMediaResponse = {
  ok: boolean;
  result: {
    name: string;
  };
};
