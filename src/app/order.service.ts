import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private orderData: any;

  setOrderData(data: any) {
    this.orderData = data;
  }

  getOrderData() {
    return this.orderData;
  }
}
