import { Controller, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Crud, CrudController, CrudRequest, Override, ParsedRequest } from "@nestjsx/crud";
import { AuthGuard } from "src/auth/auth.guard";
import { User } from "src/models/user.entity";
import { UsersService } from "./users.service";

@ApiTags('Пользователи')
@Crud({
  model: {
    type: User,
  },
	routes: {
    only: ["getManyBase", "createOneBase"],
  }
})
@Controller("users")
export class UsersController implements CrudController<User> {
  constructor(public service: UsersService) {}

	@UseGuards(AuthGuard)
	@Override('getManyBase')
	getMany(@ParsedRequest() req: CrudRequest){
		return this.service.getMany(req)
	}
}