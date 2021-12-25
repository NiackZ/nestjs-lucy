import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs'
import { User } from 'src/models/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

	constructor(
		private userService: UsersService,
		private authService: JwtService
	) { }

	async login(userDto: CreateUserDto) {
		const user = await this.validateUser(userDto)
		return this.generateToken(user)
	}


	async registration(userDto: CreateUserDto) {
		const candidate = await this.userService.getByEmail(userDto.email)
		if (candidate) {
			throw new HttpException('Пользователь с таким email уже есть в системе.', HttpStatus.BAD_REQUEST)
		}
		const hashPass = await bcrypt.hash(userDto.password, 5)
		const user = await this.userService.create({ ...userDto, password: hashPass });
		return this.generateToken(user)
	}

	private async generateToken(user: User) {
		const payload = { email: user.email, id: user.id }
		return {
			token: this.authService.sign(payload)
		}
	}
	private async validateUser(userDto: CreateUserDto) {
		const user = await this.userService.getByEmail(userDto.email)
		const passEq = await bcrypt.compare(userDto.password, user.password)
		if (user && passEq) return user
		throw new UnauthorizedException({message: "Неверный email или пароль"})
	}

}
