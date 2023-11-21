import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from '@/product/product.module';
import { CheckoutModule } from '@/checkout/checkout.module';
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
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => {
        return {
          global: true,
          secret: config.getOrThrow<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.getOrThrow<string | number>(
              'JWT_EXPIRATION_TIME',
            ),
          },
        };
      },
      inject: [ConfigService],
    }),
    ShopModule,
    ChannelModule,
    MediaModule,
    DomainModule,
    ClientModule,
    EmployeeModule,
    AuthModule,
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
