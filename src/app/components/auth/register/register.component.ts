import { CommonModule } from '@angular/common';
import { Component, SkipSelf } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class RegisterComponent {
  reactiveForm!: FormGroup;
  validated: boolean;

  constructor(@SkipSelf() private userService: UserService) {
    this.reactiveForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      repeatPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    }, {
      validators: this.passwordValidator()
    });
    this.validated = false;
  }

  submitForm() {
    this.validated = true;
    if (this.reactiveForm.valid) {
      this.userService.register(this.reactiveForm.value).subscribe();
    }
  }

  passwordValidator() : ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.value["password"];
      const repeatPassword = control.value["repeatPassword"];
      if (password !== repeatPassword) {
        return { mismatch: true };
      } else {
        return null;
      }
    }
  }
}
