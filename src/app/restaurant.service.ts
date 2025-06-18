import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from './category/category.module';
import { Table } from './table/table.module';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  

 getCategories(): Observable<string[]> {
  return this.http.get<any[]>(`${this.baseUrl}/categories`).pipe(
    map(data => data.map(cat => cat.name))
  );
}


 addCategory(category: string): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/categories`, { name: category });
}


  getMenu(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/menu`);
  }

 addItem(category: string, item: any): Observable<Category> {
  return this.http.post<Category>(`${this.baseUrl}/menu`, { category, items: [item] });
}



  getTables(): Observable<Table[]> {
    return this.http.get<Table[]>(`${this.baseUrl}/tables`);
  }

  addTable(area: string, table: string): Observable<Table> {
    return this.http.post<Table>(`${this.baseUrl}/tables`, { area, tables: [table] });
  }
  
  saveOrder(order: any) {
    return this.http.post(`${this.baseUrl}/orders`, order);
  }

  getOrders() {
  return this.http.get<any[]>(`${this.baseUrl}/orders`);
}

}
