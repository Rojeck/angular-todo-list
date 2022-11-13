import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardPageRoutingModule } from './dashboard-page-routing.module';
import { DashboardPageComponent } from './dashboard-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ModalModule } from 'src/app/shared/components/modal/modal.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ElementMenuModule } from 'src/app/shared/components/element-menu/element-menu.module';
import { SortModule } from 'src/app/shared/components/sort/sort.module';
import { DashboardEffect } from './store/dashboard.effects';
import { dashboardsReducer } from './store/dashboard.reducers';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DashboardPageService } from './services/dashboard-page.service';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [DashboardPageComponent, DashboardComponent, FilterPipe],
  imports: [
    CommonModule,
    DashboardPageRoutingModule,
    ModalModule,
    ReactiveFormsModule,
ElementMenuModule,
    SortModule,
    StoreModule.forFeature('dashboards', dashboardsReducer),
    EffectsModule.forFeature([DashboardEffect])
  ],
  providers: [DashboardPageService],
})
export class DashboardPageModule {}
