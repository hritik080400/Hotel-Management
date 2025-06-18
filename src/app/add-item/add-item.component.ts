import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantService } from '../restaurant.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css'
})
export class AddItemComponent {
  categories: string[] = [];
  selectedCategory = '';
  itemName = '';
  price = 0;

  constructor(private service: RestaurantService) {
    this.service.getCategories().subscribe(res => {
      this.categories = res;
      this.selectedCategory = this.categories[0];
    });
  }

  add() {
    if (this.selectedCategory && this.itemName && this.price > 0) {
      this.service.addItem(this.selectedCategory, { Name: this.itemName, Price: this.price }).subscribe();
      this.itemName = '';
      this.price = 0;
    }
  }
}
