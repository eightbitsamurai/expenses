import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from '../types/category';
import { User } from '../types/user';
import { getLocalStorageUser } from './helpers';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  http = inject(HttpClient);

  private categories = new BehaviorSubject<Category[]>([]);
  private isModalOpen = new BehaviorSubject(false);
  private currentCategory = new BehaviorSubject<Category | null>(null);
  private currentUser: User | null = null;

  public categories$ = this.categories.asObservable();
  public isModalOpen$ = this.isModalOpen.asObservable();
  public currentCategory$ = this.currentCategory.asObservable();

  constructor() {
    this.currentUser = getLocalStorageUser();
    this.getCategories().subscribe(payload => this.categories.next(payload))
  }

  toggleModal(modalState: boolean) {
    this.isModalOpen.next(modalState);
  }

  setCurrentPost(expense: Category | null) {
    this.currentCategory.next(expense);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`http://localhost:3000/categories/${this.currentUser!.userId}`); 
  }

  addCategory(category: Category) {
    console.log(this.currentUser, "suka")
    return this.http.post('http://localhost:3000/categories/new', {...category, userId: this.currentUser?.userId})
      .subscribe(() => {
        this.getCategories().subscribe(payload => {
          this.categories.next(payload);
          this.isModalOpen.next(false);
        })
      }); 
  }

  ediCategory(category: Category) {
    return this.http.put(`http://localhost:3000/categories/${category.categoryId}`, category)
      .subscribe(() => {
        this.getCategories().subscribe(payload => {
          this.categories.next(payload);
          this.isModalOpen.next(false);
        })
      }); 
  }

  deleteCategory(categoryId: number) {
    return this.http.delete(`http://localhost:3000/categories/${categoryId}`)
      .subscribe(() => {
        this.getCategories().subscribe(payload => {
          this.categories.next(payload);
        })
      }); 
  }
}
