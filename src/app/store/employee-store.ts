import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { Employee } from '../models/employee.interface';
import { employeesMock } from '../models/employees.mock';
import { computed, inject } from '@angular/core';
import { produce } from 'immer';
import { LoggerService } from '../services/logger/logger.service';
import { EmployeesService } from '../services/employees/employees.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

type EmployeeState = {
  _loadedItems: Employee[];
  isLoading: boolean;
  error: Error | null;
  filters: {
    name: string;
    salary: Record<'from' | 'to', number>;
  }
}

const initialState: EmployeeState = {
  _loadedItems: [],
  isLoading: false,
  error: null,
  filters: {
    name: '',
    salary: {
      from: 0,
      to: 100_000,
    }
  }
}

export const EmployeeStore = signalStore(
  // { providedIn: 'root' },
  withState(initialState),
  withComputed((state) => ({
    count: computed(() => {
      return state._loadedItems().length;
    }),
    items: computed(() => {
      let result = state._loadedItems();

      if (state.filters.name()) {
        const search = state.filters.name().toLowerCase();
        result = result.filter(e => {
          return e.firstName.toLowerCase().includes(search) || e.lastName.toLowerCase().includes(search);
        })
      }

      if (state.filters.salary.from()) {
        result = result.filter(e => e.salary >= state.filters().salary.from)
      }

      if (state.filters.salary.to()) {
        result = result.filter(e => e.salary <= state.filters().salary.to)
      }

      return result;
    }),

  })),
  withMethods((store, logger = inject(LoggerService)) => ({
    updateFiltersName(name: EmployeeState['filters']['name']) {
      patchState(store, state => ({
        filters: {
          ...state.filters, name
        }
      }))
    },
    updateFiltersSalary(value: Partial<EmployeeState['filters']['salary']>) {
      // patchState(store, state => ({
      //   filters: {
      //     ...state.filters,
      //     salary: {
      //       ...state.filters.salary, ...value
      //     },
      //   }
      // }))
      patchState(store, (state) =>
        produce(state, draft => {
          Object.assign(draft.filters.salary, value);
      }))
    },
    clearFilters(): void {
      logger.logMessage('clear started');
      patchState(store,
        (state) => ({ filters: { ...state.filters, name: '' }}),
        (state) => ({ filters: { ...state.filters, salary: { from: 0, to: 100_000 }}}),
      )
      logger.logMessage('clear finished');
    },
  })),
  withMethods((store, employeesHttp = inject(EmployeesService)) => ({
    loadEmployees: rxMethod<void>(
      pipe(
        tap(() => {
          patchState(store, { isLoading: true, error: null, _loadedItems: []})
        }),
        switchMap(() => employeesHttp.getEmployees()),
        tap({
          next(items) {
            patchState(store, { isLoading: false, error: null, _loadedItems: items})
          } ,
          error(e) {
            patchState(store, { isLoading: false, error: e, _loadedItems: []})
          },
        }),
      )
    ),
  })),
);
