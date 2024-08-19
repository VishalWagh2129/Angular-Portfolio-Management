import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuardService } from '../../../services/auth-guard.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-toolbar',
  standalone: true,
  imports: [],
  templateUrl: './admin-toolbar.component.html',
  styleUrl: './admin-toolbar.component.scss'
})
export class AdminToolbarComponent {

  constructor(private router: Router,
    private auth:AuthService,
  ) {}

  ngOnInit(): void { }
  
  logout(){
    this.auth.logout();
    this.router.navigate(['/admin-login']);
  }

}
