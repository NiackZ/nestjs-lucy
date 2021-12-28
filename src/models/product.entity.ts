import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: 'products' })
export class Product {

	@ApiProperty({ example: '1', description: 'УИД' })
	@PrimaryGeneratedColumn()
	id: number;

	@ApiProperty({example: 'Продукт 1', description:'Название'})
	@IsNotEmpty()
	@IsString()
	@Column()
	name: string;

}