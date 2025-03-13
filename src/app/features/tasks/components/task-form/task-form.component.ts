import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateTaskDto } from '@core/models/task.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Agregar nueva tarea</h2>
      
      <form [formGroup]="taskForm" (ngSubmit)="onSubmit()">
        <div class="mb-4">
          <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Título</label>
          <input 
            type="text" 
            id="title" 
            formControlName="title" 
            class="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            [class.border-red-500]="submitted && titleControl?.errors"
            [class.focus:ring-red-500]="submitted && titleControl?.errors"
            [class.opacity-60]="disabled"
            [class.bg-gray-100]="disabled"
            placeholder="Ingresa el título de la tarea"
          >
          
          @if (submitted && titleControl?.errors) {
            <div class="text-red-500 text-xs mt-1">
              @if (titleControl?.errors?.['required']) {
                <span>El título es obligatorio</span>
              }
              @if (titleControl?.errors?.['minlength']) {
                <span>El título debe tener al menos 3 caracteres</span>
              }
              @if (titleControl?.errors?.['maxlength']) {
                <span>El título no puede exceder los 100 caracteres</span>
              }
            </div>
          }
        </div>
        
        <div class="mb-4">
          <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea 
            id="description" 
            formControlName="description" 
            class="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            [class.border-red-500]="submitted && descriptionControl?.errors"
            [class.focus:ring-red-500]="submitted && descriptionControl?.errors"
            [class.opacity-60]="disabled"
            [class.bg-gray-100]="disabled"
            placeholder="Ingresa la descripción de la tarea (opcional)"
            rows="3"
          ></textarea>
          
          @if (submitted && descriptionControl?.errors) {
            <div class="text-red-500 text-xs mt-1">
              @if (descriptionControl?.errors?.['maxlength']) {
                <span>La descripción no puede exceder los 500 caracteres</span>
              }
            </div>
          }
        </div>
        
        <div class="flex justify-end gap-3">
          <button 
            type="button" 
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            [class.opacity-60]="disabled"
            [class.cursor-not-allowed]="disabled"
            [disabled]="disabled"
            (click)="resetForm()"
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            class="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            [class.opacity-60]="disabled"
            [class.cursor-not-allowed]="disabled"
            [class.hover:bg-blue-500]="disabled"
            [disabled]="disabled"
          >
            Agregar Tarea
          </button>
        </div>
      </form>
    </div>
  `
})
export class TaskFormComponent {
  @Output() createTask = new EventEmitter<CreateTaskDto>();
  @Input() disabled = false;
  
  taskForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(500)]]
    });
  }

  ngOnChanges(): void {
    if (this.disabled) {
      this.taskForm.disable();
    } else {
      this.taskForm.enable();
    }
  }

  onSubmit(): void {
    this.submitted = true;
    
    if (this.taskForm.invalid || this.disabled) {
      return;
    }
    
    const taskDto: CreateTaskDto = {
      title: this.taskForm.value.title.trim(),
      description: this.taskForm.value.description?.trim() || ''
    };
    
    this.createTask.emit(taskDto);
    this.resetForm();
  }

  resetForm(): void {
    this.taskForm.reset();
    this.submitted = false;
  }

  get titleControl() {
    return this.taskForm.get('title');
  }

  get descriptionControl() {
    return this.taskForm.get('description');
  }
}