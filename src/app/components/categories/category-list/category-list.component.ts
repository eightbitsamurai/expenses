import { Component, SkipSelf } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../../types/category';
import { CategoryService } from '../../../services/category.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'category-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent {
  isModalOpen = false;
  categoryForm!: FormGroup;
  categories: Category[] = [];

  constructor(@SkipSelf() private categoryService: CategoryService) {
    this.categoryService.isModalOpen$.subscribe(value => this.isModalOpen = value)
    this.categoryService.categories$.subscribe(value => this.categories = value)
    this.categoryForm = new FormGroup({
      categoryName: new FormControl("", Validators.required)
    })
  }

  addCategory() {
    this.categoryService.addCategory(this.categoryForm.value);
    this.categoryForm.reset();
  }

  removeCategory(categoryId: number) {
    this.categoryService.deleteCategory(categoryId);
  }

  closeModal() {
    this.categoryService.toggleModal(false);
  }
}
