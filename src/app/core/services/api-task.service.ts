import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Task, CreateTaskDto, UpdateTaskDto } from '../models/task.model';
import { AbstractTaskService } from './abstract-task.service';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiTaskService implements AbstractTaskService {
  private apiUrl = `${environment.apiUrl}/tasks`;

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl).pipe(
      map(tasks => tasks.map(task => ({
        ...task,
        createdAt: new Date(task.createdAt)
      }))),
      catchError(this.handleError)
    );
  }

  getTaskById(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`).pipe(
      map(task => ({
        ...task,
        createdAt: new Date(task.createdAt)
      })),
      catchError(this.handleError)
    );
  }

  createTask(task: CreateTaskDto): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task).pipe(
      map(task => ({
        ...task,
        createdAt: new Date(task.createdAt)
      })),
      catchError(this.handleError)
    );
  }

  updateTask(task: UpdateTaskDto): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task).pipe(
      map(task => ({
        ...task,
        createdAt: new Date(task.createdAt)
      })),
      catchError(this.handleError)
    );
  }

  deleteTask(id: string): Observable<boolean> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      map(() => true),
      catchError(this.handleError)
    );
  }

  toggleTaskStatus(id: string): Observable<Task> {
    return this.getTaskById(id).pipe(
      map(task => ({
        id: task.id,
        completed: !task.completed
      } as UpdateTaskDto)),
      switchMap((updateDto: UpdateTaskDto) => this.updateTask(updateDto)),
      catchError(this.handleError)
    );
  }
}