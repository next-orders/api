import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from '@/product/product.module';
import { CheckoutModule } from '@/checkout/checkout.module';
import { CategoryModule } from '@/category/category.module';
import { MenuModule } from '@/menu/menu.module';
import { MenuCategoryModule } from '@/menu-category/menu-category.module';
import { ShopModule } from '@/shop/shop.module';
import { ChannelModule } from '@/channel/channel.module';
import { ProductVariantModule } from '@/product-variant/product-variant.module';

@Module({
  imports: [
    ShopModule,
    ChannelModule,
    CategoryModule,
    ProductModule,
    ProductVariantModule,
    CheckoutModule,
    MenuModule,
    MenuCategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
