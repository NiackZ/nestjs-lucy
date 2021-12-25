import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto{
	@ApiProperty({example: 'Item 1', description:'Название'})	
	readonly name:string;
}