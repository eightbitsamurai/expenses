import { CommonModule } from '@angular/common';
import { Component, SkipSelf } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { ExpenseService } from '../../../services/expense.service';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../types/category';

@Component({
  selector: 'expense-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './expense-form.component.html'
})
export class ExpenseFormComponent {
  isModalOpen = false;
  expenseForm!: FormGroup;
  createMode = true;
  userId = 0;
  categories: Category[] = [];

  constructor(
    @SkipSelf() private expenseService: ExpenseService,
    @SkipSelf() private categoryService: CategoryService,
    @SkipSelf() private userService: UserService
  ) {
    this.expenseService.isModalOpen$.subscribe(value => this.isModalOpen = value)
    this.categoryService.categories$.subscribe(value => this.categories = value)
    this.userService.currentUser$.subscribe(value => this.userId = value!.userId);

    this.expenseService.currentExpense$.subscribe(expense => {
      this.expenseForm = new FormGroup({
        expenseId: new FormControl(expense?.expenseId ?? 0, Validators.required),
        userId: new FormControl(expense?.userId ?? 0, Validators.required),
        categoryId: new FormControl(expense?.categoryId ?? 0, Validators.required),
        expenseName: new FormControl(expense?.expenseName ?? "", Validators.required),
        expenseValue: new FormControl(expense?.expenseValue ?? 0, Validators.required),
        expenseDate: new FormControl(expense?.expenseDate ?? new Date(), Validators.required),
        expenseDescription: new FormControl(expense?.expenseDescription ?? "", Validators.required)
      })
      this.createMode = !expense;
    })
  }

  saveExpense() {
    if (this.createMode) {
      this.expenseService.addExpense(this.expenseForm.value);
    } else {
      this.expenseService.editExpense(this.expenseForm.value);
    }
  }

  closeModal() {
    this.expenseService.toggleModal(false);
  }
}
