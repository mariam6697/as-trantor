import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalDataService } from 'src/services/local-data.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: UntypedFormGroup;
  hide: boolean = true;

  constructor(
    private fb: UntypedFormBuilder,
    private localDataService: LocalDataService,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: new UntypedFormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      password: new UntypedFormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
    });
  }

  ngOnInit(): void {
    this.localDataService.deleteAll();
  }

  login = async (): Promise<void> => {
    try {
      if (this.loginForm.valid) {
        const email: string = this.loginForm.value.email;
        const password: string = this.loginForm.value.password;
        const response: any = await this.userService.login(email, password);
        if (response.status === 'ok') {
          this.localDataService.writeData('user', response.data);
          this.router.navigate(['../../']);
        } else {
          throw new Error('Error en la plataforma');
        }
      }
    } catch (error: any) {
      const message: string = error.response.data.message ?? 'Ocurrió un error';
      this._snackBar.open(message, 'Cerrar', {
        horizontalPosition: 'end',
        verticalPosition: 'bottom',
      });
    }
  };
}
