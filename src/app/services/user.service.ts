import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Router } from '@angular/router';
import { UserRegistration } from '../types/userRegistration';
import { UserCredentials } from '../types/userCredentials';
import { User } from '../types/user';
import { getLocalStorageUser } from './helpers';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient);
  router = inject(Router);
  private currentUser = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUser.asObservable();

  constructor() {
    this.currentUser.next(getLocalStorageUser());
  }

  register(user: UserRegistration) {
    return this.http.post<UserRegistration>('http://localhost:3000/register', user).pipe(
      map(() => {
        this.router.navigateByUrl('/login');
      })
    );
  }

  login(credentials: UserCredentials) {
    return this.http.post<User>('http://localhost:3000/login', credentials).pipe(
      map((res: User) => {
        localStorage.setItem('user', JSON.stringify(res));
        this.currentUser.next(res);
        this.router.navigateByUrl('/expenses');
      })
    );
  }

  logout() {
    return this.http.post('http://localhost:3000/logout', {}).pipe(
      map(() => {
        localStorage.removeItem('user');
        this.currentUser.next(null);
        this.router.navigateByUrl('/');
      })
    );
  }

  updateUser(user: User) {
    return this.http.put<User>(`http://localhost:3000/users/${user.userId}`, user).pipe(
      map(res => {
        localStorage.setItem('user', JSON.stringify(res));
        this.currentUser.next(res);
      })
    );
  }
}
