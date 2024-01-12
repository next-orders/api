import { createId } from '@paralleldrive/cuid2';
import { Menu } from '@api-sdk';

export class MenuEntity implements Menu {
  id!: string;
  name!: string;
  createdAt!: Date;
  updatedAt!: Date;
  channelId!: string;

  constructor(data: Partial<MenuEntity>) {
    Object.assign(this, data);

    if (!data.id) {
      this.id = createId();
    }
  }
}
