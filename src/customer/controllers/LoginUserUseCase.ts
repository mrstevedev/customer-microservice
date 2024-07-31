import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { prisma } from "../client/prisma";
import { ERROR, NAME } from "../constants/constants";
import { ILoginUserRequest } from "./CreateCustomer";

export class LoginUserUseCase {
  constructor() {}

  async login(data: ILoginUserRequest) {
    const { response, username, password } = data;
    const access = process.env.ACCESS_TOKEN_SECRET as string;
    const secret = process.env.REFRESH_TOKEN_SECRET as string;

    // Get User
    const userFound = await prisma.user.findFirst({ where: { username } });

    // Verify Passwords
    if (userFound) {
      const digest = userFound?.password;
      if (await argon2.verify(digest, password)) {
        const accessToken = jwt.sign({ username }, access, {
          expiresIn: "5m",
        });
        const refreshToken = jwt.sign({ username }, secret, {
          expiresIn: "7d",
        });

        // Set Refresh httpOnly Cookie
        response.cookie(NAME.REFRESH_TOKEN, refreshToken, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        });

        // Update Refresh cookie in DB
        await prisma.user.update({
          where: { username, password: { contains: digest } },
          data: { refreshtoken: refreshToken },
        });

        // Send new Access Token
        return response.status(200).json({ accessToken });
      } else {
        return response
          .status(400)
          .json({ error: ERROR.ERROR_INVALID_CREDENTIALS });
      }
    }
    return response.status(404).json({ error: ERROR.ERROR_USER_NOT_FOUND });
  }
}
