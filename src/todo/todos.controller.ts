import { Todo } from '../todo';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';

@Controller('todos')
export class TodosController {

    // GET /todos
    @Get()
    getAll(): Todo[] {
    }

    // GET /todos/:id
    @Get(':id')
    get(@Param('id') id: string): Todo {
        // throw new NotFoundException();
    }

    // POST /todos
    @Post()
    @HttpCode(HttpStatus.CREATED)
    add(@Body() todo: Todo): Todo {
    }

    // PUT /todos/:id
    @Put(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    update(@Param('id') id: string, @Body() todo: Todo): void {
    }

    // DELETE /todos/:id
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id') id: string): void {
    }

}
