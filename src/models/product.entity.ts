import { ApiProperty } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: 'products' })
export class Product {

	@ApiProperty({ example: '1', description: 'УИД' })
	@PrimaryGeneratedColumn()
	id: number;

	@ApiProperty({example: 'Продукт 1', description:'Название'})
	@Column()
	name: string;

}