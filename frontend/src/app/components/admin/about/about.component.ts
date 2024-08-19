import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { AboutService } from '../../../services/aboutus/about.service';
import { RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComponentManagerService } from '../../../services/component-manager.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule, ReactiveFormsModule, CommonModule, FormsModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatButtonModule,],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

  isFormEditable: boolean = false;
  submitted:boolean=false;

  aboutForm: FormGroup;
  aboutData: any = [];
  user:any;

  constructor(private aboutService: AboutService,
    private fb: FormBuilder,
    private SnackBar:MatSnackBar,
    private componentManagerService:ComponentManagerService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getAboutus();
    this.aboutForm = this.fb.group({
      status: [''],
      designation: [''],
      name: [''],
      resumeLink: [''],
      linkedinLink: [''],
      description: [''] ,
      image:['']
    });
    this.user = this.componentManagerService.user;
  }

  toggleEdit() {
    this.isFormEditable = true;
    this.aboutForm.enable();
  }

  back(){
    this.isFormEditable = false;
    this.aboutForm.disable();
    this.getAboutus();
  }

  cancelEditing() {
    this.isFormEditable = false;
    this.aboutForm.disable();
    this.getAboutus();
  }

  getAboutus() {
    this.aboutService.getAbout().subscribe((res) => {
      this.aboutData = res.data[0];
      this.setdata(this.aboutData);
    })
  }

  setdata(data) {
    this.aboutForm.get('name').setValue(data.name);
    this.aboutForm.get('status').setValue(data.record_status);
    this.aboutForm.get('designation').setValue(data.designation);
    this.aboutForm.get('description').setValue(data.description);
    this.aboutForm.get('linkedinLink').setValue(data.linkedin);
    this.aboutForm.get('resumeLink').setValue(data.resume);
    this.aboutForm.get('image').setValue(data.image);
  }

  onUpdate(){
    this.submitted = true;
    if (this.aboutForm.valid) {
      const data = {
        name: this.aboutForm.value.name,
        updated_by:this.user.UDID,
        designation: this.aboutForm.value.designation,
        description: this.aboutForm.value.description,
        record_status: this.aboutForm.value.status,
        linkedin:this.aboutForm.value.linkedinLink,
        resume:this.aboutForm.value.resumeLink,
      };
      this.aboutService.update(this.aboutData.udid,data).subscribe((res: any) => {
        if (res.success) {
          this.SnackBar.open('About us Updated successfully', 'Close', {
            duration: 3000 // duration in milliseconds
          });
          this.isFormEditable = false;
          this.getAboutus();
        } else {
          this.SnackBar.open('Error While Updated About', 'Close', {
            duration: 3000 // duration in milliseconds
          });
        }
      }
      );
    }
  }

}

