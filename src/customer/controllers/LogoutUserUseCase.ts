import { prisma } from "../client/prisma";
import { NAME } from "../constants/constants";

export class LogoutUserUseCase {
  constructor() {}

  async logout(data: any) {
    const { request, response } = data;
    const cookies = request.cookies;
    if (!cookies?.refreshToken) return response.sendStatus(204);
    const refreshToken = cookies.refreshToken;

    // The client should also remove the access token in memory (state, context, localStorage)

    response.clearCookie(NAME.REFRESH_TOKEN, {
      httpOnly: true,
    });

    const userFound = await prisma.user.findFirst({
      where: { refreshtoken: refreshToken },
    });

    if (userFound) {
      await prisma.user.update({
        where: { refreshtoken: refreshToken },
        data: { refreshtoken: "" },
      });

      return response
        .status(200)
        .json({ message: "You have successfully signed out" });
    }
    return response.sendStatus(204);
  }
}
