import { IsOptional } from 'class-validator';

export class FindCategoryDto {
  @IsOptional()
  id?: string;

  @IsOptional()
  slug?: string;
}
