import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '@core/models/task.model';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TaskFilter, FilterTasksPipe } from '@shared/pipes/filter-tasks.pipe';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskItemComponent, FilterTasksPipe],
  template: `
    <div class="bg-white rounded-lg shadow-sm p-6">
      <div class="flex flex-col md:flex-row justify-between items-center mb-4">
        <h2 class="text-xl font-semibold text-gray-800">Mis Tareas</h2>
       
        <div class="flex gap-2">
          <button
            type="button"
            class="px-3 py-1 text-sm rounded-md transition-colors"
            [class.bg-blue-100]="currentFilter === 'all'"
            [class.text-blue-700]="currentFilter === 'all'"
            [class.bg-gray-100]="currentFilter !== 'all'"
            [class.text-gray-700]="currentFilter !== 'all'"
            (click)="setFilter('all')"
          >
            Todas
          </button>
          <button
            type="button"
            class="px-3 py-1 text-sm rounded-md transition-colors"
            [class.bg-blue-100]="currentFilter === 'pending'"
            [class.text-blue-700]="currentFilter === 'pending'"
            [class.bg-gray-100]="currentFilter !== 'pending'"
            [class.text-gray-700]="currentFilter !== 'pending'"
            (click)="setFilter('pending')"
          >
            Pendientes
          </button>
          <button
            type="button"
            class="px-3 py-1 text-sm rounded-md transition-colors"
            [class.bg-blue-100]="currentFilter === 'completed'"
            [class.text-blue-700]="currentFilter === 'completed'"
            [class.bg-gray-100]="currentFilter !== 'completed'"
            [class.text-gray-700]="currentFilter !== 'completed'"
            (click)="setFilter('completed')"
          >
            Completadas
          </button>
        </div>
      </div>
      
      @if (isLoading) {
        <div class="flex justify-center items-center py-8">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
          <span class="ml-3 text-gray-600 text-sm">Cargando tareas...</span>
        </div>
      } @else if (tasks.length > 0) {
        <div class="space-y-3 gap-2 flex flex-col">
          @for (task of tasks | filterTasks:currentFilter; track task.id) {
            <app-task-item
              [task]="task"
              (toggleStatus)="onToggleStatus($event)"
              (deleteTask)="onDeleteTask($event)"
            ></app-task-item>
          }
        </div>
      } @else {
        <div class="text-center py-6">
          <p class="text-gray-500">No hay tareas para mostrar</p>
        </div>
      }
    </div>
  `
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Input() isLoading = false;
  @Output() toggleStatus = new EventEmitter<string>();
  @Output() deleteTask = new EventEmitter<string>();
 
  currentFilter: TaskFilter = TaskFilter.ALL;
  
  setFilter(filter: string): void {
    this.currentFilter = filter as TaskFilter;
  }
  
  onToggleStatus(taskId: string): void {
    this.toggleStatus.emit(taskId);
  }
  
  onDeleteTask(taskId: string): void {
    this.deleteTask.emit(taskId);
  }
}