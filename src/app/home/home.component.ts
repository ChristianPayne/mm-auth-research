import { Component, OnInit } from '@angular/core';
import { CustomFieldsService } from '../core/custom-fields.service';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private customFieldsService: CustomFieldsService,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log(this.customFieldsService.getCustomFields());
  }

  logout() {
    this.loginService.logout();
  }

  goToLoginPage() {
    this.router.navigateByUrl('login')
  }
}
