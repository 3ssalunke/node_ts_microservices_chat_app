import { Request, Response, NextFunction } from "express";

import UserService from "#root/adapters/UserService";

const injectUserSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.cookies.userSessionId) {
      const userSession = await UserService.fetchUserSession({
        sessionId: req.cookies.userSessionId,
      });
      res.locals.userSession = userSession;
    }

    return next();
  } catch (error) {
    console.log(error);
  }
};

export default injectUserSession;
