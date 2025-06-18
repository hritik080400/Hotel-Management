import { Item } from "../item/item.module";

export interface Category {
  category: string;
  items: Item[];
}
