import { IsIn, IsOptional, IsString, MinLength } from "class-validator"
import { TaskStatus } from "../task.entity"
import { ApiProperty } from "@nestjs/swagger"

export class CreateTaskDto{
    @IsString()
    @MinLength(3)
    @ApiProperty({ example: 'Crear una tarea', description: 'El nombre de la tarea' })

    title: string

    @IsString()
    @ApiProperty({ example: 'Neceisto crear uan tarea a las 2', description: 'Descripción de la tarea' })

    description: string
}

export class UpdateTaskDto{
    @IsString()
    @IsOptional()
    @ApiProperty({ example: 'Eliminar una tarea', description: 'El nombre de la tarea que se desea cambiar' })
    title?: string

    @IsString()
    @IsOptional()
    @ApiProperty({ example: 'Neceisto eliminar uan tarea a las 2', description: 'La descripcion de la tarea que se desea cambiar' })
    description?: string

    @IsString()
    @IsOptional()
    @IsIn([TaskStatus.DONE,TaskStatus.IN_PROGRESS,TaskStatus.PENDING])
    @ApiProperty({ example: 'DONE', description: 'Cambiar el estado al que se desee(dentro de los parametros: DONE, IN_PROGRESS, PENDING)' })
    status?: TaskStatus
}