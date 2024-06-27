import { CommonModule } from '@angular/common';
import { Component, SkipSelf } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginForm!: FormGroup;
  error: string | null = null;

  constructor(@SkipSelf() private userService: UserService) {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required])
    })
  }

  submitForm() {
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value).subscribe(
        () => { this.error = null; },
        (error) => { this.error = error.error; }
      );
    }
  }
}
