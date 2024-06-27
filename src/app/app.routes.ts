import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { IndexComponent } from './components/common/index/index.component';
import { NonAuthGuard } from './helpers/nonAuth.guard';
import { AuthGuard } from './helpers/auth.guard';
import { RegisterComponent } from './components/auth/register/register.component';
import { ExpenseListComponent } from './components/expenses/expense-list.component';

export const routes: Routes = [
    { path: '', component: IndexComponent },
    { path: 'login', component: LoginComponent, canActivate: [NonAuthGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [NonAuthGuard] },
    { path: 'expenses', component: ExpenseListComponent, canActivate: [AuthGuard] },
];
