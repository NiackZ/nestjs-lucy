import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto{
	
	@IsNotEmpty()
	@IsEmail()	
	@ApiProperty({example: 'user@mail.ru', description:'Почта'})	
	readonly email:string;
	
	@IsNotEmpty()
	@IsString()
	@ApiProperty({example: '123456', description:'Пароль'})	
	readonly password:string;
}