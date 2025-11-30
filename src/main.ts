import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideConfigService } from './app/shared/config.service';

void bootstrapApplication(AppComponent, {
  providers: [provideZonelessChangeDetection(), provideConfigService()],
});
