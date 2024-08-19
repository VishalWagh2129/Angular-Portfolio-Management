import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../../../services/projects/project.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ComponentManagerService } from '../../../../services/component-manager.service';

@Component({
  selector: 'app-projects-add',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './projects-add.component.html',
  styleUrl: './projects-add.component.scss'
})
export class ProjectsAddComponent {

  projectForm: FormGroup;
  submitted: boolean = false;
  projectId:any;
  mode:any;
  projectDetailData:any;
  user:any;

  constructor(private fb: FormBuilder,
    private projectService: ProjectService,
    private router : Router,
    private SnackBar:MatSnackBar,
    private activatedRoute : ActivatedRoute,
    private componentManagerService:ComponentManagerService
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params:any) => {
      if (!!params.id) {
        this.projectId = params.id;
        this.mode = params.mode;
        this.getBrandDetailsById(this.projectId);
      }
    });
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      status: ['', Validators.required],
      description: ['', Validators.required],
      link:['',Validators.required],
      image:['',Validators.required]
    });
    this.user = this.componentManagerService.user;
  }

  onSubmit() {
    this.submitted = true;
    if (this.projectForm.valid) {
      const data = {
        name: this.projectForm.value.name,
        created_by: this.user.UDID,
        updated_by:this.user.UDID,
        description: this.projectForm.value.description,
        record_status: this.projectForm.value.status,
        link: this.projectForm.value.link,
        image: this.projectForm.value.image
      };
      this.projectService.save(data).subscribe((res: any) => {
        if (res.success) {
          this.SnackBar.open('project saved successfully', 'Close', {
            duration: 3000 // duration in milliseconds
          });
          this.router.navigate(['/admin/projects']);
        } else {
          this.SnackBar.open('Error While Saving project', 'Close', {
            duration: 3000 // duration in milliseconds
          });
        }
      }
      );
    }
  }

  onUpdate(){
    this.submitted = true;
    if (this.projectForm.valid) {
      const data = {
        name: this.projectForm.value.name,
        created_by: this.user.UDID,
        updated_by:this.user.UDID,
        description: this.projectForm.value.description,
        record_status: this.projectForm.value.status,
        link: this.projectForm.value.link,
        image: this.projectForm.value.image
      };
      this.projectService.update(this.projectId,data).subscribe((res: any) => {
        if (res.success) {
          this.SnackBar.open('Project Updated successfully', 'Close', {
            duration: 3000 // duration in milliseconds
          });
          this.router.navigate(['/admin/projects']);
        } else {
          this.SnackBar.open('Error While Updated Project', 'Close', {
            duration: 3000 // duration in milliseconds
          });
        }
      }
      );
    }
  }

  getBrandDetailsById(id){
    this.projectService.getById(id).subscribe((res:any)=>{
      if(res.success){
        this.projectDetailData = res.data;
        this.setData(res.data);
      }
    })
  }

  setData(data){
    if(this.mode === 'edit'){
      this.projectForm.get('name').setValue(data.name);
      this.projectForm.get('description').setValue(data.description);
      this.projectForm.get('status').setValue(data.record_status);
      this.projectForm.get('link').setValue(data.link);
      this.projectForm.get('image').setValue(data.image);
    }
  }


}
