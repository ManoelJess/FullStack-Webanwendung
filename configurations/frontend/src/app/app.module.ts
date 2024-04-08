import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { ChartModule } from 'primeng/chart'
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
//import { ChartModule } from 'angular-highcharts';
import { BodyComponent } from './component/body/body.component';
import { SidenavComponent } from './component/sidenav/sidenav.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ProductsComponent } from './component/products/products.component';
import { StatisticsComponent } from './component/statistics/statistics.component';
import { CoupensComponent } from './component/coupens/coupens.component';
import { PagesComponent } from './component/pages/pages.component';
import { MediaComponent } from './component/media/media.component';
import { SettingsComponent } from './component/settings/settings.component';
import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CustomerServices } from './services/customerServices';
import { AppConfigModule } from './app-config/app-config.module';
import { RevenueServices } from './services/revenueServices';
import { TranslocoRootModule } from './transloco-root.module';

@Injectable({providedIn: 'root'})
export class ServiceNameService {
  constructor(private httpClient: HttpClient) { }
  
}


@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    SidenavComponent,
    DashboardComponent,
    ProductsComponent,
    StatisticsComponent,
    CoupensComponent,
    PagesComponent,
    MediaComponent,
    SettingsComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SliderModule,
    AppRoutingModule,
    FontAwesomeModule,
    ChartModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppConfigModule,
    FontAwesomeModule,
    TranslocoRootModule,    
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    CustomerServices,
    RevenueServices
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
