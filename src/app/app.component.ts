import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'web-cco';
  userName: string;

  get isLogged(): boolean {
    return !!this.loginService.userLogged;
  }

  constructor(private loginService: LoginService, private dialog: MatDialog, private router: Router) {}
  onOpenLogin(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.userName = this.loginService.userLogged;
      this.router.navigate(['products']);
    });
  }
  onLogout(): void {
    this.loginService.userLogged = null;
    this.userName = '';
  }
  onNavigateToProducts() {
    this.router.navigate(['products']);
  }
}
