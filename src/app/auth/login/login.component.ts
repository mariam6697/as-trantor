import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalDataService } from 'src/app/services/local-data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide: boolean = true;

  constructor(
    private fb: FormBuilder,
    private localDataService: LocalDataService,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      password: new FormControl('', [
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
