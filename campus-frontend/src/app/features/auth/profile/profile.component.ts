import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Pull the stored user object from localStorage
    this.user = JSON.parse(localStorage.getItem('currentUser')!);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }
}
