import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComponentManagerService } from '../../../services/component-manager.service'; 
import { ProjectService } from '../../../services/projects/project.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [MatTableModule,CommonModule,RouterModule,MatIconModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {

  brandData: any = [];
  user: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private projectService: ProjectService,
    private snackBar: MatSnackBar,
    private componentManagerService: ComponentManagerService
  ) {
  }

  ngOnInit() {
    this.getAllProjects();
    this.user = this.componentManagerService.user;
  }

  getAllProjects() {
    this.projectService.getAll().subscribe((res: any) => {
      if (res.success) {
        this.brandData = res.data;
      }
    });
  }

  deleteProject(data) {
    this.projectService.delete(data.udid).subscribe((res: any) => {
      if (res.success) {
        this.snackBar.open('Project Deleted successfully', 'Close', {
          duration: 3000 // duration in milliseconds
        });
      }
      this.getAllProjects();
    });
  }
  displayedColumns: string[] = ['name', 'status', 'action'];

  editProject(data) {
    this.router.navigate(['/admin/projects/add/'], { queryParams: { id: data.udid, mode: 'edit' } });
  }

  addProject() {
    this.router.navigate(['/admin/projects/add'], { queryParams: { mode: 'add' } });
  }

}
