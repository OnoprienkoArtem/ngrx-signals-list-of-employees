import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { employeesMock } from '../../models/employees.mock';
import { Employee } from '../../models/employee.interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  #http = inject(HttpClient);

  #createHttpParams(criteria: any, page: number, pageSize: number) {
    return new HttpParams({
      fromObject: { ...criteria, _limit: pageSize, _page: page },
    });
  }

  getEmployees(criteria: any = {}): Observable<Employee[]> {
    return this.#getPage(criteria);
  }

  #getPage(criteria: any): Observable<Employee[]> {
    return of(employeesMock);
  }
}
