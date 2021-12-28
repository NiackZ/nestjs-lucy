import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateProductDto{

	@ApiProperty({example: 'Item 1', description:'Название'})	
	@IsString()
	@IsNotEmpty()
	readonly name:string;
}