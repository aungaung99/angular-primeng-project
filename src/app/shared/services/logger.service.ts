import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LogLevel } from '@core_models/logger-model';
import { GLOBAL_DEV_MODE_LOCAL } from '../../global';

@Injectable({
  providedIn: 'root'
})

export class LoggerService {
  logLevel: LogLevel = new LogLevel();

  constructor(private route: ActivatedRoute) {
  }

  info(msg: any): void {
    this.logWith(this.logLevel.Info, msg);
  }

  warn(msg: any): void {
    this.logWith(this.logLevel.Warn, msg);
  }

  error(msg: any): void {
    this.logWith(this.logLevel.Error, msg);
  }

  success(msg: any): void {
    this.logWith(this.logLevel.Success, msg);
  }

  private logWith(level: any, msg: any): void {
    if (!GLOBAL_DEV_MODE_LOCAL) return;
    let $messageType: String = typeof (msg);

    if (level <= this.logLevel.Error) {
      let $message: String = ($messageType === 'string' || $messageType === 'boolean' || $messageType === 'number' || $messageType === 'bigint') ? msg : "See detail...";
      switch (level) {
        case this.logLevel.None:
          return console.log(msg);
        case this.logLevel.Info:
          console.info('%c' + '[' + new Date().toLocaleTimeString() + '] ' + $message,
            'color: #54679A;background-color: rgba(213, 228, 255, 0.24);font-family:\'Cascadia Code\'');
          if ($messageType !== 'string' && $messageType !== 'boolean' && $messageType !== 'number' && $messageType !== 'bigint') {
            console.info(
              msg);
          }
          return;
        case this.logLevel.Warn:
          console.warn('%c' + '[' + new Date().toLocaleTimeString() + '] ' + $message,
            'font-family:\'Cascadia Code\'')
          if ($messageType !== 'string' && $messageType !== 'boolean' && $messageType !== 'number' && $messageType !== 'bigint') {
            console.warn(
              msg);
          }
          return;
        case this.logLevel.Error:
          console.error('%c' + '[' + new Date().toLocaleTimeString() + '] ' + $message,
            'font-family:\'Cascadia Code\'');
          if ($messageType !== 'string' && $messageType !== 'boolean' && $messageType !== 'number' && $messageType !== 'bigint') {
            console.error(
              msg);
          }
          return;
        case this.logLevel.Success:
          console.info('%c' + '[' + new Date().toLocaleTimeString() + '] ' + $message,
            'color: #208E1F;font-family:\'Cascadia Code\'');
          if ($messageType !== 'string' && $messageType !== 'boolean' && $messageType !== 'number' && $messageType !== 'bigint') {
            console.info(
              msg);
          }
          return;
        default:
          console.debug(msg);
      }
    }
  }
}
