// src/app/order-page/order-page.component.ts
import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../restaurant.service';
import { Table } from '../table/table.module';
import { Category } from '../category/category.module';
import { Item } from '../item/item.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
 templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.css'
})
export class OrderPageComponent implements OnInit {
  tables: Table[] = [];
  selectedTable: string|null = null;
  categories: string[] = [];
  selectedCategory = '';
  items: Item[] = [];
  orderList: any[] = [];
  paymentMethod: string = 'Cash';

 constructor(
  private service: RestaurantService,
  private router: Router,
  private orderService: OrderService
) {}

  ngOnInit() {
    this.loadTables();
    this.loadCategories();
  }

  loadTables() {
    this.service.getTables().subscribe(res => {
      this.tables = res;
    });
  }

  selectTable(area: string, table: string) {
    this.selectedTable = table;
    this.resetOrder();
  }

  loadCategories() {
    this.service.getCategories().subscribe(res => {
      this.categories = res;
      this.selectedCategory = this.categories[0] || '';
      this.loadItems();
    });
  }

  loadItems() {
    if (!this.selectedCategory) return;
    this.service.getMenu().subscribe(res => {
      const cat = res.find(c => c.category === this.selectedCategory);
      this.items = cat?.items || [];
    });
  }

  addItem(item: Item) {
    const existing = this.orderList.find(o => o.Name === item.Name);
    if (existing) existing.qty++;
    else this.orderList.push({ ...item, qty: 1 });
  }

  increaseQty(item: any) { item.qty++; }
  decreaseQty(item: any) { if (item.qty > 1) item.qty--; }

  get total() {
    return this.orderList.reduce((sum, ord) => sum + ord.Price * ord.qty, 0);
  }

  
saveOrder(print: boolean = false) {
  if (!this.selectedTable || this.orderList.length === 0) {
    alert('Select a table and add items!');
    return;
  }

  const payload = {
    table: this.selectedTable,
    items: this.orderList.map(o => ({ name: o.Name, qty: o.qty, price: o.Price })),
    total: this.total,
    paymentMethod: this.paymentMethod,
    print
  };

  this.service.saveOrder(payload).subscribe(() => {
    alert('Order saved!');
    this.resetOrder();  // ✅ Only clears orderList
  });
}






 resetOrder() {
  this.orderList = [];
}

  
 

  removeItem(item: any) {
  const index = this.orderList.indexOf(item);
  if (index !== -1) {
    this.orderList.splice(index, 1);
  }
}
}
