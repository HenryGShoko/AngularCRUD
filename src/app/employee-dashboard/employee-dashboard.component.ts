import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dashboard.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css'],
})
export class EmployeeDashboardComponent implements OnInit {
  formValue!: FormGroup;
  employeeModelObj: EmployeeModel = new EmployeeModel();
  employeeData!: any;
  showAdd!: boolean;
  showUpdate!: boolean;
  allEmployees: any;

  constructor(private formbuilder: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName: [''],
      lastName: [''],
      mobile: [''],
      email: [''],
      dateOfBirth: [''],
      streetAddress: [''],
      city: [''],
      postalCode: [''],
      country: [''],
      skill: [''],
      yrsExp: [''],
      seniorityRating: [''],
    });
    this.getAllEmployee();
  }

  clickAddEmployee() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postEmployeeDetails() {
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.dateOfBirth = this.formValue.value.dateOfBirth;
    this.employeeModelObj.streetAddress = this.formValue.value.streetAddress;
    this.employeeModelObj.city = this.formValue.value.city;
    this.employeeModelObj.postalCode = this.formValue.value.postalCode;
    this.employeeModelObj.country = this.formValue.value.country;
    this.employeeModelObj.skill = this.formValue.value.skill;
    this.employeeModelObj.yrsExp = this.formValue.value.yrsExp;
    this.employeeModelObj.seniorityRating =
      this.formValue.value.seniorityRating;

    this.api.postEmployee(this.employeeModelObj).subscribe(
      (res: any) => {
        console.log('res');
        alert('Employee created successfully');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllEmployee();
      },
      (err: any) => {
        console.log('something went wrong');
      }
    );
  }
  // getAllEmployee() {
  //   this.api.getEmployee().subscribe((res) => {
  //     this.employeeData = res;
  //   });
  // }

  getAllEmployee() {
    this.api.getEmployee().subscribe((res) => {
      this.allEmployees = res;
      this.employeeData = res;
    });
  }

  deleteEmployee(row: any) {
    this.api.deleteEmployee(row.id).subscribe((res) => {
      alert('Employee  deleted');
      this.getAllEmployee();
    });
  }

  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.employeeModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['dateOfBirth'].setValue(row.dateOfBirth);
    this.formValue.controls['streetAddress'].setValue(row.streetAddress);
    this.formValue.controls['city'].setValue(row.city);
    this.formValue.controls['postalCode'].setValue(row.postalCode);
    this.formValue.controls['country'].setValue(row.country);
    this.formValue.controls['skill'].setValue(row.skill);
    this.formValue.controls['yrsExp'].setValue(row.yrsExp);
    this.formValue.controls['seniorityRating'].setValue(row.seniorityRating);
  }

  updateEmployeeDetails() {
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.dateOfBirth = this.formValue.value.dateOfBirth;
    this.employeeModelObj.streetAddress = this.formValue.value.streetAddress;
    this.employeeModelObj.city = this.formValue.value.city;
    this.employeeModelObj.postalCode = this.formValue.value.postalCode;
    this.employeeModelObj.country = this.formValue.value.country;
    this.employeeModelObj.skill = this.formValue.value.skill;
    this.employeeModelObj.yrsExp = this.formValue.value.yrsExp;
    this.employeeModelObj.seniorityRating =
      this.formValue.value.seniorityRating;

    this.api
      .updateEmployee(this.employeeModelObj, this.employeeModelObj.id)
      .subscribe((res) => {
        alert('Updated successfully');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllEmployee();
      });
  }
  // onSearch(event: Event) {}

  onSearch(event: Event) {
    const query = (event.target as HTMLInputElement).value.toLowerCase();

    this.employeeData = this.allEmployees.filter((employee: any) => {
      return (
        employee.firstName.toLowerCase().includes(query) ||
        employee.lastName.toLowerCase().includes(query)
      );
    });
  }
}
