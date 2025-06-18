import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'add-category', loadComponent: () => import('./add-category/add-category.component').then(m => m.AddCategoryComponent) },
  { path: 'add-item', loadComponent: () => import('./add-item/add-item.component').then(m => m.AddItemComponent) },
  { path: 'add-table', loadComponent: () => import('./add-table/add-table.component').then(m => m.AddTableComponent) },
  { path: 'order', loadComponent: () => import('./order-page/order-page.component').then(m => m.OrderPageComponent) },
  { path: 'report', loadComponent: () => import('./report/report.component').then(m => m.ReportComponent) },
  { path: 'bill', loadComponent: () => import('./bill/bill.component').then(m => m.BillComponent) },  // ✅ Fixed
  { path: '', redirectTo: 'order', pathMatch: 'full' },
  { path: '**', redirectTo: 'order' }
];

