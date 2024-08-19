import { Component } from '@angular/core';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { AdminToolbarComponent } from '../admin-toolbar/admin-toolbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-wrapper',
  standalone: true,
  imports: [RouterOutlet,AdminToolbarComponent,AdminSidebarComponent],
  templateUrl: './admin-wrapper.component.html',
  styleUrl: './admin-wrapper.component.scss'
})
export class AdminWrapperComponent {

}
