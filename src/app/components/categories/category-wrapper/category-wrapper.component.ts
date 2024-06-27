import { Component, SkipSelf } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../types/category';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'category-wrapper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-wrapper.component.html',
  styleUrl: './category-wrapper.component.css'
})
export class CategoryWrapperComponent {
  categories: Category[] = [];

  constructor(@SkipSelf() private categoryService: CategoryService) {
    this.categoryService.categories$.subscribe(value => this.categories = value);
  }

  openModal() {
    this.categoryService.toggleModal(true);
  }
}
