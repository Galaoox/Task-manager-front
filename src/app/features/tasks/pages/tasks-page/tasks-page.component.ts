import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

import { TaskFormComponent } from '../../components/task-form/task-form.component';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { ToggleSwitchComponent } from '@shared/components/toggle-switch/toggle-switch.component';

import { TaskServiceFactory, TaskServiceType } from '@core/services/task-service-factory.service';
import { Task, CreateTaskDto } from '@core/models/task.model';

@Component({
  selector: 'app-tasks-page',
  standalone: true,
  imports: [CommonModule, TaskFormComponent, TaskListComponent, ToggleSwitchComponent],
  template: `
    <div class="bg-gray-50 min-h-screen p-4 md:p-6">
      <div class="max-w-4xl mx-auto">
        <header class="mb-6">
          <div class="flex flex-col md:flex-row justify-between items-center">
            <h1 class="text-2xl font-bold text-gray-900">Gestión de Tareas</h1>
            <app-toggle-switch
              [checked]="isUsingApi"
              leftLabel="Local"
              rightLabel="API"
              [disabled]="isLoading"
              (toggleChange)="onToggleDataSource($event)"
            ></app-toggle-switch>
          </div>
          <p class="text-gray-600 mt-1 text-center lg:text-left">Modo actual: {{ isUsingApi ? 'API' : 'Local' }}</p>
        </header>

        @if (errorMessage) {
          <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 relative" role="alert">
            <span class="block sm:inline">{{ errorMessage }}</span>
            <button class="absolute top-0 bottom-0 right-0 px-4 py-3" (click)="clearError()">
              <span class="sr-only">Cerrar</span>
              <svg class="h-4 w-4 fill-current" role="button" viewBox="0 0 20 20">
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
              </svg>
            </button>
          </div>
        }

        <app-task-form
          (createTask)="onCreateTask($event)"
          [disabled]="isLoading"
        ></app-task-form>

        <app-task-list
          [tasks]="tasks"
          [isLoading]="isLoading"
          (toggleStatus)="onToggleTaskStatus($event)"
          (deleteTask)="onDeleteTask($event)"
        ></app-task-list>
      </div>
    </div>
  `
})
export class TasksPageComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  isUsingApi = false;
  isLoading = false;
  errorMessage = '';
  
  private destroy$ = new Subject<void>();

  constructor(private taskServiceFactory: TaskServiceFactory) {}

  ngOnInit(): void {
    this.loadTasks();
    
    this.taskServiceFactory.currentServiceType$
      .pipe(takeUntil(this.destroy$))
      .subscribe(type => {
        this.isUsingApi = type === TaskServiceType.API;
        this.loadTasks();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadTasks(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.tasks = [];
    this.taskServiceFactory.getTaskService().getTasks()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (tasks) => {
          this.tasks = tasks;
          this.isLoading = false;
          console.log(this.isLoading)

        },
        error: (error) => {
          this.handleError(error, 'Error al cargar las tareas');
          this.tasks = [];
          this.isLoading = false;
        }
      });
  }

  onCreateTask(taskDto: CreateTaskDto): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.taskServiceFactory.getTaskService().createTask(taskDto)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (newTask) => {
          this.tasks = [newTask, ...this.tasks];
          this.isLoading = false;
        },
        error: (error) => {
          this.handleError(error, 'Error al crear la tarea');
          this.isLoading = false;
        }
      });
  }

  onToggleTaskStatus(taskId: string): void {
    this.errorMessage = '';
    
    this.taskServiceFactory.getTaskService().toggleTaskStatus(taskId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (updatedTask) => {
          this.tasks = this.tasks.map(task => 
            task.id === updatedTask.id ? updatedTask : task
          );
        },
        error: (error) => {
          this.handleError(error, 'Error al actualizar la tarea');
        }
      });
  }

  onDeleteTask(taskId: string): void {
    this.errorMessage = '';
    
    this.taskServiceFactory.getTaskService().deleteTask(taskId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.tasks = this.tasks.filter(task => task.id !== taskId);
        },
        error: (error) => {
          this.handleError(error, 'Error al eliminar la tarea');
        }
      });
  }

  onToggleDataSource(isUsingApi: boolean): void {
    const newType = isUsingApi ? TaskServiceType.API : TaskServiceType.LOCAL;
    this.taskServiceFactory.setServiceType(newType);
  }

  private handleError(error: any, defaultMessage: string): void {
    console.error(error);
    this.errorMessage = defaultMessage;
  }

  clearError(): void {
    this.errorMessage = '';
  }
}