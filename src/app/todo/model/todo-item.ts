import { TodoStatus } from 'app/todo/model/todo-status.enum';

export class TodoItem {
  id: number;
  title: string;
  createTime: number;
  finishTime?: number;
  cancelTime?: number;
  status: TodoStatus = TodoStatus.NEW;
}
