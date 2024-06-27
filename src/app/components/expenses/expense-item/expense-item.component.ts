import { CommonModule } from '@angular/common';
import { Component, Input, SkipSelf } from '@angular/core';
import { Expense } from '../../../types/expense';
import { ExpenseService } from '../../../services/expense.service';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'expense-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expense-item.component.html',
  styleUrl: './expense-item.component.css'
})
export class ExpenseItemComponent {
  @Input() expense!: Expense;
  categoryName = "";

  constructor(@SkipSelf() private expenseService: ExpenseService, @SkipSelf() private categoryService: CategoryService) {
    this.categoryService.categories$.subscribe(categories => {
      this.categoryName = categories.filter(c => c.categoryId = this.expense?.categoryId)?.[0]?.categoryName ?? "No category";
    })
  }

  editExpense() {
    this.expenseService.toggleModal(true);
    this.expenseService.setCurrentExpense(this.expense);
  }

  deleteExpense() {
    this.expenseService.deleteExpense(this.expense.expenseId);
  }
}
