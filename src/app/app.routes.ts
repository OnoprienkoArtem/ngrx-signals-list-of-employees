import { Routes } from '@angular/router';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { HomeComponent } from './components/home/home.component';
import { EmployeeStore } from './store/employee-store';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'employees',
    // providers: [EmployeeStore],
    component: EmployeesListComponent
  }
];
