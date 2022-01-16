import UserService from "#root/adapters/UserService";
import { ResolverContext } from "#root/graphql/types";

interface Args {
  me: boolean;
}

const deleteUserSessionResolver = async (
  obj: any,
  args: Args,
  context: ResolverContext
) => {
  if (args.me !== true) throw new Error("Unsupported argument value");

  const sessionId = context.res.locals.userSession.id;

  await UserService.deleteUserSession({ sessionId });

  context.res.clearCookie("userSessionId");

  return true;
};

export default deleteUserSessionResolver;
