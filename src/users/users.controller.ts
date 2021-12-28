import { Controller, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Crud, CrudController} from "@nestjsx/crud";
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
		getManyBase:{
			decorators:[UseGuards(AuthGuard), ApiBearerAuth()]
		}
  }
})
@Controller("users")
export class UsersController implements CrudController<User> {
  constructor(public service: UsersService) {}
}