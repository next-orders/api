import { Injectable } from '@nestjs/common';
import { Product } from '../types';
import { categoryPizza } from './temp-data/pizza';
import { categorySushi } from './temp-data/sushi';
import { categoryWok } from './temp-data/wok';
import { categoryBurger } from './temp-data/burger';
import { categoryDessert } from './temp-data/dessert';
import { categoryRoll } from './temp-data/roll';

@Injectable()
export class ProductService {
  /** List of the shop's products */
  async findProductsInCategory(id: string): Promise<Product[] | null> {
    if (id === '1') return categoryPizza;
    if (id === '2') return categorySushi;
    if (id === '3') return categoryWok;
    if (id === '4') return categoryBurger;
    if (id === '5') return categoryDessert;
    if (id === '6') return categoryRoll;

    return null;
  }
}
