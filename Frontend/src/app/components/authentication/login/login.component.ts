import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginRequest } from 'src/app/Interfaces/AuthenticationRequest';
import { AuthService } from 'src/app/_services/auth.service';
import { SalesService } from 'src/app/_services/sales.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls:['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private _salesService: SalesService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  showError: boolean;
  errorMessage: string;
  loginForm: FormGroup;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  validateControl(controlName: string) {
    return (
      this.loginForm.get(controlName)?.invalid &&
      this.loginForm.get(controlName)?.touched
    );
  }

  hasError(controlName: string, errorName: string) {
    return this.loginForm.get(controlName)?.hasError(errorName);
  }

  loginUser() {
    this.showError = false;
    const login = { ...this.loginForm.value };
    const userForAuth: LoginRequest = {
      email: login.email,
      password: login.password,
    };

    this.authService.loginUser(userForAuth).subscribe({
      next: (data) => {
        var returnUrl = this.route.snapshot.queryParams['returnUrl'];
        if (returnUrl) this.router.navigate([returnUrl]);
        else this.router.navigate(['/']);
        this.authService.saveToken(data);
        this.toastr.success('مرحبا بك في مكتبتي');
        this._salesService.getNumberOfOrdersForUser();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
