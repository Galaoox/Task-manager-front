import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../../core/models/task.model';

export enum TaskFilter {
  ALL = 'all',
  COMPLETED = 'completed',
  PENDING = 'pending'
}

@Pipe({
  name: 'filterTasks',
  standalone: true
})
export class FilterTasksPipe implements PipeTransform {
  transform(tasks: Task[], filter: TaskFilter = TaskFilter.ALL): Task[] {
    if (!tasks || !Array.isArray(tasks)) {
      return [];
    }

    switch (filter) {
      case TaskFilter.COMPLETED:
        return tasks.filter(task => task.completed);
      case TaskFilter.PENDING:
        return tasks.filter(task => !task.completed);
      case TaskFilter.ALL:
      default:
        return tasks;
    }
  }
}