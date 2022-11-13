import { Dashboard } from '../../../shared/interfaces/dashboard.interface';
import { SortDashboardsValues } from '../types/sort.interface';

export interface DashboardStateInterface {
  backEndErrors: boolean | null;
  dashboards: Dashboard[] | null;
  isLoading: boolean | null;
  isDashboardCreateModalOpen: boolean;
  isDashboardEditModalOpen: boolean;
  changeDashboardFailure: boolean;
  sortTypeValue: 'ASC' | 'DESC';
  sortByValue: SortDashboardsValues;
}
