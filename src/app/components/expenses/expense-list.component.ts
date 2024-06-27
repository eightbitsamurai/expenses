import { CommonModule } from '@angular/common';
import { Component, SkipSelf } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../types/expense';
import { CategoryService } from '../../services/category.service';
import { ExpenseItemComponent } from "./expense-item/expense-item.component";
import { ExpenseFormComponent } from "./expense-form/expense-form.component";
import { CategoryWrapperComponent } from '../categories/category-wrapper/category-wrapper.component';
import { CategoryListComponent } from '../categories/category-list/category-list.component';
import { UserService } from '../../services/user.service';
import { User } from '../../types/user';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'expense-list',
    standalone: true,
    templateUrl: './expense-list.component.html',
    styleUrl: './expense-list.component.css',
    imports: [CommonModule, FormsModule, ExpenseItemComponent, ExpenseFormComponent, CategoryWrapperComponent, CategoryListComponent]
})
export class ExpenseListComponent {
  expenses: Expense[] = [];
  user: User | null = null;
  editMode = false;
  monthlyBudget = 0;
  monthlySpendings = 0;

  constructor(
    @SkipSelf() private userService: UserService,
    private expenseService: ExpenseService, 
    private categoryService: CategoryService
  ) {
    this.expenseService.expenses$.subscribe(value => {
      this.expenses = value;
      this.monthlySpendings = value.reduce((total, expense) => total + expense.expenseValue, 0)
    });
    this.userService.currentUser$.subscribe(value => {
      this.user = value;
      this.monthlyBudget = value!.monthlyBudget;
    })
  }

  addNewExpense() {
    this.expenseService.setCurrentExpense(null);
    this.expenseService.toggleModal(true);
  }

  toggleEditMode(mode: boolean) {
    this.monthlyBudget = this.user!.monthlyBudget;
    this.editMode = mode;
  }

  updateMonthlyBudget() {
    this.user!.monthlyBudget = this.monthlyBudget;
    this.userService.updateUser(this.user!).subscribe(() => this.editMode = false);
  }
}
