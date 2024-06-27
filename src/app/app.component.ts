import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NavbarComponent],
  providers: [UserService],
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(private router: Router, private userService: UserService) {
  }
  title = 'form-app';
}
