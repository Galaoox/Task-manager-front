import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../../../core/models/task.model';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="flex justify-between items-start p-4 border border-gray-200 rounded-lg bg-white hover:shadow-sm transition-shadow"
      [class.bg-gray-50]="task.completed"
    >
      <div class="flex-1">
        <div class="flex items-center gap-3 mb-2">
          <button 
            type="button" 
            class="w-5 h-5 border-2 rounded flex items-center justify-center cursor-pointer"
            [class.border-gray-300]="!task.completed"
            [class.bg-blue-500]="task.completed"
            [class.border-blue-500]="task.completed"
            (click)="onToggleStatus()"
            [attr.aria-checked]="task.completed"
          >
            @if (task.completed) {
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            }
          </button>
          
          <h3 
            class="text-base font-medium m-0"
            [class.text-gray-900]="!task.completed"
            [class.text-gray-500]="task.completed"
            [class.line-through]="task.completed"
          >{{ task.title }}</h3>
        </div>
        
        @if (task.description) {
          <p class="text-sm text-gray-600 mb-2">{{ task.description }}</p>
        }
        
        <div class="text-xs text-gray-500">
          <span>Creada: {{ formatDate(task.createdAt) }}</span>
        </div>
      </div>
      
      <div>
        <button 
          type="button" 
          class="text-gray-500 hover:text-red-500 p-1 rounded-full hover:bg-red-50 transition-colors"
          (click)="onDeleteTask()"
          aria-label="Eliminar tarea"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 6h18"></path>
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
          </svg>
        </button>
      </div>
    </div>
  `
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() toggleStatus = new EventEmitter<string>();
  @Output() deleteTask = new EventEmitter<string>();

  onToggleStatus(): void {
    if (this.task?.id) {
      this.toggleStatus.emit(this.task.id);
    }
  }

  onDeleteTask(): void {
    if (this.task?.id) {
      this.deleteTask.emit(this.task.id);
    }
  }

  formatDate(date: Date): string {
    if (!date) return '';
    
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}