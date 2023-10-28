import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Public } from '@/auth/auth.decorator';

@Controller('category')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  @Public()
  @Get('list')
  listCategories() {
    return this.service.listCategories();
  }
}
