import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AbstractTaskService } from './abstract-task.service';
import { LocalTaskService } from './local-task.service';
import { ApiTaskService } from './api-task.service';

export enum TaskServiceType {
  LOCAL = 'local',
  API = 'api'
}

@Injectable({
  providedIn: 'root'
})
export class TaskServiceFactory {
  private currentServiceType = new BehaviorSubject<TaskServiceType>(TaskServiceType.LOCAL);
  currentServiceType$ = this.currentServiceType.asObservable();

  constructor(
    private localTaskService: LocalTaskService,
    private apiTaskService: ApiTaskService
  ) {}

  getTaskService(): AbstractTaskService {
    return this.currentServiceType.value === TaskServiceType.LOCAL
      ? this.localTaskService
      : this.apiTaskService;
  }

  toggleServiceType(): void {
    const newType = this.currentServiceType.value === TaskServiceType.LOCAL
      ? TaskServiceType.API
      : TaskServiceType.LOCAL;
    
    this.currentServiceType.next(newType);
  }

  setServiceType(type: TaskServiceType): void {
    this.currentServiceType.next(type);
  }
}