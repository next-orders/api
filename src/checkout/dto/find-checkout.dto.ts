import { IsNotEmpty } from 'class-validator';

export class FindCheckoutDto {
  @IsNotEmpty()
  id!: string;
}
