import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { Task, CreateTaskDto } from '@core/models/task.model';
import { TaskServiceFactory } from '@core/services/task-service-factory.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, TaskFormComponent, TaskListComponent],
  template: `
    <div class="container mx-auto px-4 py-8 max-w-4xl">
      <app-task-form
        (createTask)="onCreateTask($event)"
      ></app-task-form>
      
      <app-task-list
        [tasks]="tasks"
        (toggleStatus)="onToggleStatus($event)"
        (deleteTask)="onDeleteTask($event)"
      ></app-task-list>
    </div>
  `
})
export class TasksComponent {
  tasks: Task[] = [];
  private readonly ERROR_MESSAGES = {
    LOAD: 'Error al cargar las tareas',
    CREATE: 'Error al crear la tarea',
    UPDATE: 'Error al actualizar la tarea',
    DELETE: 'Error al eliminar la tarea'
  } as const;

  constructor(@Inject(TaskServiceFactory) private taskService: TaskServiceFactory) {
    this.loadTasks();
  }

  private loadTasks(): void {
    this.taskService.getTaskService().getTasks().subscribe({
      next: this.handleLoadTasksSuccess.bind(this),
      error: (error) => this.handleError(error, this.ERROR_MESSAGES.LOAD)
    });
  }

  onCreateTask(taskDto: CreateTaskDto): void {
    if (!this.isValidTaskDto(taskDto)) {
      this.handleError(new Error('Datos de tarea inválidos'), this.ERROR_MESSAGES.CREATE);
      return;
    }

    this.taskService.getTaskService().createTask(taskDto).subscribe({
      next: this.handleCreateTaskSuccess.bind(this),
      error: (error) => this.handleError(error, this.ERROR_MESSAGES.CREATE)
    });
  }

  onToggleStatus(taskId: string): void {
    if (!this.isValidTaskId(taskId)) {
      this.handleError(new Error('ID de tarea inválido'), this.ERROR_MESSAGES.UPDATE);
      return;
    }

    this.taskService.getTaskService().toggleTaskStatus(taskId).subscribe({
      next: this.handleToggleTaskSuccess.bind(this),
      error: (error) => this.handleError(error, this.ERROR_MESSAGES.UPDATE)
    });
  }

  onDeleteTask(taskId: string): void {
    if (!this.isValidTaskId(taskId)) {
      this.handleError(new Error('ID de tarea inválido'), this.ERROR_MESSAGES.DELETE);
      return;
    }

    this.taskService.getTaskService().deleteTask(taskId).subscribe({
      next: () => this.handleDeleteTaskSuccess(taskId),
      error: (error) => this.handleError(error, this.ERROR_MESSAGES.DELETE)
    });
  }

  private handleLoadTasksSuccess(tasks: Task[]): void {
    this.tasks = tasks;
  }

  private handleCreateTaskSuccess(newTask: Task): void {
    this.tasks = [...this.tasks, newTask];
  }

  private handleToggleTaskSuccess(updatedTask: Task): void {
    this.tasks = this.tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    );
  }

  private handleDeleteTaskSuccess(taskId: string): void {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
  }

  private handleError(error: Error, message: string): void {
    console.error(message, error);
    // Aquí podrías integrar un servicio de notificaciones
    // this.notificationService.showError(message);
  }

  private isValidTaskDto(taskDto: CreateTaskDto): boolean {
    return Boolean(
      taskDto &&
      typeof taskDto.title === 'string' &&
      taskDto.title.trim().length > 0
    );
  }

  private isValidTaskId(taskId: string): boolean {
    return Boolean(
      taskId &&
      typeof taskId === 'string' &&
      taskId.trim().length > 0
    );
  }
} 