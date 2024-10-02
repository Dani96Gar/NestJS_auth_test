import { Body, Controller, Delete, Get, Param, Post, Patch } from '@nestjs/common';
import { TasksService } from './tasks.service'
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('tasks')
export class TasksController {

    constructor(private taskService: TasksService) { }

    @Get()
    @ApiOperation({ summary: 'Obtener todas las tareas.' })
    @ApiResponse({ status: 200, description: 'Lista de tareas obtenida correctamente.' })
    getAllTasks() {
        return this.taskService.getAllTasks()
    }

    @Post()
    @ApiOperation({ summary: 'Crear una nueva tarea.' })
    @ApiResponse({ status: 201, description: 'Tarea creada correctamente.' })
    createTask(@Body() newTask: CreateTaskDto){
        return this.taskService.createTasks(newTask.title, newTask.description)
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar una tarea,es necesario el id indicandolo como parametro, es posible solo actualizar una parte.' })
    @ApiResponse({ status: 200, description: 'Tarea actualizada correctamente.' })
    updateTask(@Param('id')id: string, @Body() updatedFields: UpdateTaskDto){

        return this.taskService.updateTasks(id, updatedFields)

    }

    @Delete(':id')
    @ApiOperation({ summary: 'Borrar uan tarea, para ello es necesario indicar la id como parametro' })
    @ApiResponse({ status: 200, description: 'Tarea eliminada correctamente' })
    delateTask(@Param('id') id: string){

        this.taskService.delateTasks(id)

    }
}
