import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { ApiService } from '../shared/api.service';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {

    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/heroes']);
    }
  }

  onSubmit (loginForm: NgForm) {

    const values = loginForm.value;

    const payload = {
      username: values.username,
      password: values.password
    };

    this.apiService.post('login', payload)
    .subscribe(data => {
      this.authService.setToken(data.token);
      this.router.navigate(['/heroes']);
    });
  }

}
