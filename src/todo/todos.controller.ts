import { TodosService } from './todos.service';
import { Todo } from '../todo';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Put } from '@nestjs/common';

@Controller('todos')
export class TodosController {

    constructor(private readonly todosService: TodosService) {}

    // GET /todos
    @Get()
    getAll(): Todo[] {
        return this.todosService.getAll('user');
    }

    // GET /todos/:id
    @Get(':id')
    get(@Param('id') id: string): Todo {
        const todo = this.todosService.get(+id, 'user');
        if (!todo) {
            throw new NotFoundException();
        }
        return todo;
    }

    // POST /todos
    @Post()
    @HttpCode(HttpStatus.CREATED)
    add(@Body() todo: Todo): Todo {
        this.todosService.add(todo, 'user');
        return todo;
    }

    // PUT /todos/:id
    @Put(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    update(@Param('id') id: string, @Body() todo: Todo): void {
        todo.id = +id;
        this.todosService.update(todo, 'user');
    }

    // DELETE /todos/:id
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id') id: string): void {
        this.todosService.delete(+id, 'user');
    }
}
