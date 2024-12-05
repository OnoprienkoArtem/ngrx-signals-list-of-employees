import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { employeesMock } from '../../models/employees.mock';
import { Employee } from '../../models/employee.interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  #http = inject(HttpClient);
  apiUrl = '';

  #createHttpParams(criteria: any, page: number, pageSize: number) {
    return new HttpParams({
      fromObject: { ...criteria, _limit: pageSize, _page: page },
    });
  }

  getEmployees(criteria: any = {}): Observable<Employee[]> {
    console.log('getEmployees');
    return this.#getPage(criteria);
  }

  #getPage(criteria: any = {}, page: number = 1, pageSize = 50): Observable<Employee[]> {
    return of(employeesMock)
  }

  async fetchEmployees(criteria: any = {}, page: number = 1, pageSize = 50) {
    const query = new URLSearchParams({...criteria,
      _limit: pageSize.toString(),
      _page: page.toString()
    }).toString();
    const response = await fetch(`${this.apiUrl}/employees?${query}`);
    return response.json() as Promise<any[]>;
  }
}
