import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantService } from '../restaurant.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css',
})
export class AddCategoryComponent {
  newCategory = '';
  categories: string[] = [];

  constructor(private service: RestaurantService) {
    this.loadCategories();
  }

  loadCategories() {
    this.service.getCategories().subscribe(res => this.categories = res);
  }

  add() {
    if (this.newCategory) {
      this.service.addCategory(this.newCategory).subscribe(() => this.loadCategories());
      this.newCategory = '';
    }
  }
}
