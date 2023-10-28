import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
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
import { MediaModule } from '@/media/media.module';
import { DomainModule } from '@/domain/domain.module';
import { AvatarModule } from '@/avatar/avatar.module';
import { ClientModule } from '@/client/client.module';
import { EmployeeModule } from '@/employee/employee.module';
import { AuthModule } from '@/auth/auth.module';
import { AuthGuard } from '@/auth/auth.guard';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET ?? 'no-secret',
      signOptions: { expiresIn: '30d' },
    }),
    ShopModule,
    ChannelModule,
    MediaModule,
    DomainModule,
    ClientModule,
    EmployeeModule,
    AuthModule,
    CategoryModule,
    ProductModule,
    ProductVariantModule,
    CheckoutModule,
    MenuModule,
    MenuCategoryModule,
    AvatarModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AppService,
  ],
})
export class AppModule {}
