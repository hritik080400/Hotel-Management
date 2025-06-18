import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantService } from '../restaurant.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent implements OnInit {
  
  orders: any[] = [];

  constructor(private service: RestaurantService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.service.getOrders().subscribe(res => {
      this.orders = res;
    });
  }

  getTotalQty(order: any) {
    return order.items.reduce((sum: number, i: any) => sum + i.qty, 0);
  }
}
