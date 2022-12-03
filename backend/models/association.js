import { User } from "./user.models";
import { UsersFormation } from "./userFormation.model";

Tag.belongsToMany(User, {
  through: "id",
});

Post.belongsToMany(UsersFormation, {
  through: "UserId",
});
