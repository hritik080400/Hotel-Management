import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantService } from '../restaurant.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-table.component.html',
  styleUrl: './add-table.component.css'
})
export class AddTableComponent {
  area = '';
  tableName = '';

  constructor(private service: RestaurantService) {}

  add() {
    if (this.area && this.tableName) {
      this.service.addTable(this.area, this.tableName).subscribe();
      this.area = '';
      this.tableName = '';
    }
  }
}
