import { HttpClient } from '@angular/common/http';
import {
  ENVIRONMENT_INITIALIZER,
  inject,
  Injectable,
  makeEnvironmentProviders,
  provideEnvironmentInitializer,
  signal,
} from '@angular/core';
import { Config, initConfig } from './config';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private http = inject(HttpClient);

  config = signal<Config | undefined>(undefined);

  constructor() {}

  loadConfig() {
    this.http.get<Config>('./assets/config.json').subscribe((config) => {
      this.config.set(config);
    });
  }
}

export const provideConfigService = () =>
  makeEnvironmentProviders([
    ConfigService,
    provideEnvironmentInitializer(() => {
      const configService = inject(ConfigService);
      configService.loadConfig();
    }),
  ]);
