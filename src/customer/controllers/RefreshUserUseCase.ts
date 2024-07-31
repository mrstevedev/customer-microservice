import jwt from "jsonwebtoken";
import { prisma } from "../client/prisma";
import { ERROR } from "../constants/constants";

export class RefreshUserUseCase {
  constructor() {}

  async refresh(data: any) {
    const { request, response } = data;
    const cookies = request.cookies;
    const refreshToken = cookies.refreshToken;
    const access = process.env.ACCESS_TOKEN_SECRET as string;
    const secret = process.env.REFRESH_TOKEN_SECRET as string;

    if (!cookies?.refreshToken)
      return response.status(401).json({ error: ERROR.ERROR_UNAUTHORIZED });

    const foundUser = await prisma.user.findFirst({
      where: { refreshtoken: refreshToken },
    });

    if (!foundUser) return response.sendStatus(403);

    jwt.verify(refreshToken, secret, (err: any, decoded: any) => {
      if (err || foundUser.username !== decoded.username) {
        return response.status(403).json({ error: err });
      }
      const accessToken = jwt.sign({ username: decoded.username }, access, {
        expiresIn: "5m",
      });
      return response.json({ accessToken });
    });
  }
}
