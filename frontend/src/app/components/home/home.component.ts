import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomersService } from '../../services/customers/customers.service';
import { AboutService } from '../../services/aboutus/about.service';
import { ProjectService } from '../../services/projects/project.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  contactForm: FormGroup;
  alertMessage: string = '';
  alertType: number = 0;
  aboutData:any=[];
  projectsData:any=[];

  constructor(private fb: FormBuilder,
     private customersService: CustomersService,
     private aboutService:AboutService,
     private projectService:ProjectService
  ) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
    this.getAbout();
    this.getProjects();
  }

  get email(): AbstractControl<any, any> | null {
    return this.contactForm.get('email');
  }

  get message(): AbstractControl<any, any> | null {
    return this.contactForm.get('message');
  }

  get name(): AbstractControl<any, any> | null {
    return this.contactForm.get('name');
  }

  getAbout(){
    this.aboutService.getAbout().subscribe((res)=>{
      this.aboutData = res.data[0];
    })
  }

  getProjects(){
    this.projectService.getAll().subscribe((res:any)=>{
      this.projectsData = res.data;
    })
  }

  openLinkedin(data){
    const url = data.startsWith('http') ? data : `https://${data}`;
    window.open(url,'_blank');
  }

  goToLink(data){
    const url = data.startsWith('http') ? data : `https://${data}`;
    window.open(url,'_blank');
  }

  onSubmit(){
    const data = {
      name:this.contactForm.value.name,
      email:this.contactForm.value.email,
      message:this.contactForm.value.message,
    }
    this.customersService.createCustomer(data).subscribe({
      next: (result) => {
        if (result.success === true) {
          this.alertMessage = result.message;
          this.alertType = 0;
          this.contactForm.reset();
        } else if (result.success === false) {
          this.alertMessage = result.message;
          this.alertType = 1;
        }
      },
      error: (error) => {
        this.alertMessage = error.message;
        this.alertType = 2;
      },
    })
  }

}
