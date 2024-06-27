import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { UserRegistration } from '../../../types/userRegistration';

@Component({
  selector: 'index',
  standalone: true,
  imports: [CommonModule],
  providers: [UserService],
  templateUrl: './index.component.html',
})
export class IndexComponent {
  constructor(private userService: UserService) {}
}