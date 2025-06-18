import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { OrderService } from '../order.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bill',
  standalone: true,
  imports: [CommonModule], // ✅ Add this
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {
  @ViewChild('billContent') billContent!: ElementRef;

  order: any;
  total = 0;
  serviceCharge = 50;
  cgst = 0;
  sgst = 0;
  grandTotal = 0;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.order = this.orderService.getOrderData();
    if (!this.order) return;

    this.total = this.order.items.reduce((sum: number, item: any) => sum + item.Price * item.qty, 0);
    this.cgst = this.total * 0.025;
    this.sgst = this.total * 0.025;
    this.grandTotal = this.total + this.serviceCharge + this.cgst + this.sgst;

    setTimeout(() => this.print(), 500);
  }

  print() {
    const printContent = this.billContent.nativeElement.innerHTML;
    const original = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = original;
    location.reload(); // Return to app
  }
}
