import jwt from "jsonwebtoken";
import { User } from "../entities/index";

interface JWTOptions {
  decodeJWT: (token: string) => Promise<User | undefined>;
  createJWT: (id: string) => string;
}

export const optionsJWT: JWTOptions = {
  decodeJWT: async (token) => {
    try {
      const decoded: any = jwt.verify(token, process.env.JWT_TOKEN || "");
      const { id } = decoded;
      const user = await User.findOne({ id });
      return user;
    } catch (error) {
      return undefined;
    }
  },
  createJWT: (id) => {
    const token = jwt.sign(
      {
        id,
      },
      process.env.JWT_TOKEN || ""
    );
    return token;
  },
};
