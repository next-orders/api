import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { CheckoutModule } from './checkout/checkout.module';

@Module({
  imports: [ProductModule, CheckoutModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
