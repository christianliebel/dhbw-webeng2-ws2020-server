import { Todo } from './../todo';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TodosService {
    // new Map<"username", Map<"todo.id", Todo>>
    private readonly userTodos = new Map<string, Map<number, Todo>>();
    private nextId = 1;
    
    private getUserTodos(client: string): Map<number, Todo> {
        if (this.userTodos.has(client)) {
            return this.userTodos.get(client);
        }

        const todoMap = new Map<number, Todo>();
        this.userTodos.set(client, todoMap);
        return todoMap;
    }

    add(todo: Todo, client: string): void {
        todo.id = this.nextId++;
        this.update(todo, client);
    }

    update(todo: Todo, client: string): void {
        this.getUserTodos(client).set(todo.id, todo);
    }

    delete(id: number, client: string): void {
        this.getUserTodos(client).delete(id);
    }

    get(id: number, client: string): Todo {
        return this.getUserTodos(client).get(id);
    }

    getAll(client: string): Todo[] {
        return Array.from(this.getUserTodos(client).values());
    }
}
