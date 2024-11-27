import { Component, inject } from '@angular/core';
import { EmployeeStore } from '../../store/employee-store';
import { SkeletonModule } from 'primeng/skeleton';
import { EmployeesFiltersComponent } from '../employees-filters/employees-filters.component';
import { ButtonDirective } from 'primeng/button';

@Component({
  selector: 'app-employees-list',
  standalone: true,
  providers: [EmployeeStore],
  imports: [SkeletonModule, EmployeesFiltersComponent, ButtonDirective],
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.scss'
})
export class EmployeesListComponent {
  store = inject(EmployeeStore);
}
