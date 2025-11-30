import { HttpClient } from '@angular/common/http';
import {
  ENVIRONMENT_INITIALIZER,
  inject,
  Injectable,
  makeEnvironmentProviders,
  provideEnvironmentInitializer
} from '@angular/core';
import { Config, initConfig } from './config';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private http = inject(HttpClient);
  private _config = initConfig;

  get config(): Config {
    return { ...this._config };
  }

  constructor() {}

  loadConfig() {
    this.http.get<Config>('./assets/config.json').subscribe((config) => {
      this._config = config;
    });
  }
}

export const provideConfigService = () => makeEnvironmentProviders([
  ConfigService,
  provideEnvironmentInitializer(() => {
    const configService = inject(ConfigService);
    configService.loadConfig();
  })
])
