import { ProductMedia, ProductVariant } from '@api-sdk';

export const changeMediaInProductVariant = (productVariants: any[]) => {
  const productVariantsPrepared: ProductVariant[] = [];

  // Move Media to root
  for (const productVariant of productVariants) {
    const media: ProductMedia[] = productVariant.media.map(
      (media: { media: { id: string; alt: string; url: string } }) => ({
        id: media.media.id,
        alt: media.media.alt,
        url: media.media.url,
      }),
    );

    productVariantsPrepared.push({
      ...productVariant,
      media: media,
    });
  }

  return productVariantsPrepared;
};
