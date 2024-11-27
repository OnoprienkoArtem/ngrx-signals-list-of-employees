import { Component, inject } from '@angular/core';
import { EmployeeStore } from '../../store/employee-store';
import { ButtonDirective } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-employees-filters',
  standalone: true,
  providers: [],
  imports: [
    ButtonDirective,
    InputGroupModule,
    InputTextModule
  ],
  templateUrl: './employees-filters.component.html',
  styleUrl: './employees-filters.component.scss'
})
export class EmployeesFiltersComponent {
  store = inject(EmployeeStore);

  updateName(event: Event) {
    const newValue = (event.target as HTMLInputElement).value;
    this.store.updateFiltersName(newValue);
  }

  updateSalaryFrom(event: Event) {
    const newValue = (event.target as HTMLInputElement).value;
    this.store.updateFiltersSalary({ from: newValue } as any);
  }

  updateSalaryTo(event: Event) {
    const newValue = (event.target as HTMLInputElement).value;
    this.store.updateFiltersSalary({ to: newValue } as any);
  }
}
