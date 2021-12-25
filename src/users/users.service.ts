import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Override } from "@nestjsx/crud";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { User } from "src/models/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
  constructor(@InjectRepository(User) repo) {
    super(repo);
  }

	@Override()
	async getByEmail(email: string){
		const user = await this.repo.findOne({where:{email}});
		return user
 	}

	@Override("createOneBase")
	async create(dto: CreateUserDto){
		const user = await this.repo.create(dto);
		return user
 	}
}