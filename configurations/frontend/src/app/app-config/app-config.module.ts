import { CUSTOM_ELEMENTS_SCHEMA, InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { env } from '../environment/environment';

export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export class AppConfig{
  apiEndPoint: String | undefined;
}

export const APP_DI_CONFIG: AppConfig = {
  apiEndPoint: env.apiEndpoint
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{
    provide:APP_CONFIG,
    useValue:APP_DI_CONFIG
}],
})
export class AppConfigModule { }
