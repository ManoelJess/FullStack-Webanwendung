import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ProductsComponent } from './component/products/products.component';
import { StatisticsComponent } from './component/statistics/statistics.component';
import { CoupensComponent } from './component/coupens/coupens.component';
import { PagesComponent } from './component/pages/pages.component';
import { SettingsComponent } from './component/settings/settings.component';
import { MediaComponent } from './component/media/media.component';

  const routes: Routes =[ 
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'products', component: ProductsComponent},
    {path: 'statistics', component: StatisticsComponent},
    {path: 'coupens', component: CoupensComponent},
    {path: 'pages', component: PagesComponent},
    {path: 'media', component: MediaComponent},
    {path: 'settings', component: SettingsComponent}
  ]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [ RouterModule]
})
export class AppRoutingModule { }
