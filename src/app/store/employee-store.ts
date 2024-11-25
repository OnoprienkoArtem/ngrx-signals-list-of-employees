import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { Employee } from '../models/employee.interface';
import { employeesMock } from '../models/employees.mock';
import { computed } from '@angular/core';
import { produce } from 'immer';

type EmployeeState = {
  loadedItems: Employee[];
  isLoading: boolean;
  error: Error | null;
  filters: {
    name: string;
    salary: Record<'from' | 'to', number>;
  }
}

const initialState: EmployeeState = {
  loadedItems: employeesMock,
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
      return state.loadedItems().length;
    }),
    items: computed(() => {
      let result = state.loadedItems();

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
  withMethods((store) => ({
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
    }
  })),
);
