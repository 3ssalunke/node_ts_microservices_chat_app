import UserService from "#root/adapters/UserService";
import { UserSessionType } from "#root/graphql/types";

const UserSession = {
  user: async (userSession: UserSessionType) => {
    return await UserService.fetchUser({ userId: userSession.userId });
  },
};

export default UserSession;
