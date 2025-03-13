import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task, CreateTaskDto, UpdateTaskDto } from '../models/task.model';

@Injectable()
export abstract class AbstractTaskService {
  abstract getTasks(): Observable<Task[]>;
  abstract getTaskById(id: string): Observable<Task>;
  abstract createTask(task: CreateTaskDto): Observable<Task>;
  abstract updateTask(task: UpdateTaskDto): Observable<Task>;
  abstract deleteTask(id: string): Observable<boolean>;
  abstract toggleTaskStatus(id: string): Observable<Task>;
}