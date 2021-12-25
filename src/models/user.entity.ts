import { ApiProperty } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: 'users' })
export class User {
	@ApiProperty({example: '1', description:'УИД'})
	@PrimaryGeneratedColumn()
	id: number;

	@ApiProperty({example: 'user@mail.ru', description:'Почта'})
	@Column({ unique: true })
	email: string;

	@ApiProperty({example: 'myPassword', description:'Пароль'})
	@Column()
	password: string;

}