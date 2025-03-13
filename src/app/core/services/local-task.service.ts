import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Task, CreateTaskDto, UpdateTaskDto } from '../models/task.model';
import { AbstractTaskService } from './abstract-task.service';

@Injectable({
  providedIn: 'root'
})
export class LocalTaskService implements AbstractTaskService {
  private readonly STORAGE_KEY = 'tasks';
  private tasks: Task[] = [];

  constructor() {
    this.loadTasks();
  }

  private loadTasks(): void {
    const storedTasks = localStorage.getItem(this.STORAGE_KEY);
    if (storedTasks) {
      try {
        const parsedTasks = JSON.parse(storedTasks);
        this.tasks = parsedTasks.map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt)
        }));
      } catch (error) {
        console.error('Error parsing tasks from localStorage:', error);
        this.tasks = [];
      }
    }
  }

  private saveTasks(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.tasks));
  }

  getTasks(): Observable<Task[]> {
    return of([...this.tasks]);
  }

  getTaskById(id: string): Observable<Task> {
    const task = this.tasks.find(t => t.id === id);
    if (!task) {
      return throwError(() => new Error(`Task with id ${id} not found`));
    }
    return of({...task});
  }

  createTask(taskDto: CreateTaskDto): Observable<Task> {
    if (!taskDto.title?.trim()) {
      return throwError(() => new Error('Task title is required'));
    }

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: taskDto.title.trim(),
      description: taskDto.description?.trim() || '',
      completed: false,
      createdAt: new Date()
    };

    this.tasks.push(newTask);
    this.saveTasks();
    return of({...newTask});
  }

  updateTask(taskDto: UpdateTaskDto): Observable<Task> {
    if (!taskDto.id) {
      return throwError(() => new Error('Task ID is required for update'));
    }

    const index = this.tasks.findIndex(t => t.id === taskDto.id);
    if (index === -1) {
      return throwError(() => new Error(`Task with id ${taskDto.id} not found`));
    }

    const updatedTask = {
      ...this.tasks[index],
      ...(taskDto.title !== undefined && { title: taskDto.title.trim() }),
      ...(taskDto.description !== undefined && { description: taskDto.description.trim() }),
      ...(taskDto.completed !== undefined && { completed: taskDto.completed })
    };

    this.tasks[index] = updatedTask;
    this.saveTasks();
    return of({...updatedTask});
  }

  deleteTask(id: string): Observable<boolean> {
    const initialLength = this.tasks.length;
    this.tasks = this.tasks.filter(t => t.id !== id);
    
    if (this.tasks.length === initialLength) {
      return throwError(() => new Error(`Task with id ${id} not found`));
    }
    
    this.saveTasks();
    return of(true);
  }

  toggleTaskStatus(id: string): Observable<Task> {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index === -1) {
      return throwError(() => new Error(`Task with id ${id} not found`));
    }

    const updatedTask = {
      ...this.tasks[index],
      completed: !this.tasks[index].completed
    };

    this.tasks[index] = updatedTask;
    this.saveTasks();
    return of({...updatedTask});
  }
}