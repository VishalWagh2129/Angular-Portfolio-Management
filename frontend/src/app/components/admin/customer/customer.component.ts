import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomersService } from '../../../services/customers/customers.service';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [MatTableModule,CommonModule,RouterModule,MatIconModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent {

  brandData:any=[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar : MatSnackBar,
    private customersService:CustomersService
  ) {
  }

  ngOnInit(){
    this.getAllMessages();
  }

  getAllMessages(){
    this.customersService.getAllMessages().subscribe((res:any)=>{
      if(res.success){
        this.brandData = res.data;
      }
    });
  }

  displayedColumns: string[] = ['name','email', 'message','status'];


}
