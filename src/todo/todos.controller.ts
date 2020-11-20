import { TodosService } from './todos.service';
import { Todo } from '../todo';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Put, Req } from '@nestjs/common';

@Controller('todos')
export class TodosController {

    constructor(private readonly todosService: TodosService) {}

    // GET /todos
    @Get()
    getAll(@Req() req): Todo[] {
        return this.todosService.getAll(req.user.sub);
    }

    // GET /todos/:id
    @Get(':id')
    get(@Param('id') id: string, @Req() req): Todo {
        const todo = this.todosService.get(+id, req.user.sub);
        if (!todo) {
            throw new NotFoundException();
        }
        return todo;
    }

    // POST /todos
    @Post()
    @HttpCode(HttpStatus.CREATED)
    add(@Body() todo: Todo, @Req() req): Todo {
        this.todosService.add(todo, req.user.sub);
        return todo;
    }

    // PUT /todos/:id
    @Put(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    update(@Param('id') id: string, @Body() todo: Todo, @Req() req): void {
        todo.id = +id;
        this.todosService.update(todo, req.user.sub);
    }

    // DELETE /todos/:id
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id') id: string, @Req() req): void {
        this.todosService.delete(+id, req.user.sub);
    }
}
