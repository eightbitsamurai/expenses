import { HttpClient } from '@angular/common/http';
import { Injectable, SkipSelf, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Expense } from '../types/expense';
import { UserService } from './user.service';
import { User } from '../types/user';
import { getLocalStorageUser } from './helpers';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  http = inject(HttpClient);

  private expenses = new BehaviorSubject<Expense[]>([]);
  private isModalOpen = new BehaviorSubject(false);
  private currentExpense = new BehaviorSubject<Expense | null>(null);
  private currentUser: User | null = null;

  public expenses$ = this.expenses.asObservable();
  public isModalOpen$ = this.isModalOpen.asObservable();
  public currentExpense$ = this.currentExpense.asObservable();

  constructor() {
    this.currentUser = getLocalStorageUser();
    this.getExpenses().subscribe(payload => this.expenses.next(payload))
  }

  toggleModal(modalState: boolean) {
    this.isModalOpen.next(modalState);
  }

  setCurrentExpense(expense: Expense | null) {
    this.currentExpense.next(expense);
  }

  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(`http://localhost:3000/expenses/${this.currentUser!.userId}`); 
  }

  addExpense(expense: Expense) {
    return this.http.post('http://localhost:3000/expenses/new', {...expense, userId: this.currentUser?.userId})
      .subscribe(() => {
        this.getExpenses().subscribe(payload => {
          console.log(payload)
          this.expenses.next(payload);
          this.isModalOpen.next(false);
        })
      }); 
  }

  editExpense(expense: Expense) {
    return this.http.put(`http://localhost:3000/expenses/${expense.expenseId}`, expense)
      .subscribe(() => {
        this.getExpenses().subscribe(payload => {
          this.expenses.next(payload);
          this.isModalOpen.next(false);
        })
      }); 
  }

  deleteExpense(expenseId: number) {
    return this.http.delete(`http://localhost:3000/expenses/${expenseId}`)
      .subscribe(() => {
        this.getExpenses().subscribe(payload => {
          this.expenses.next(payload);
        })
      }); 
  }
}
