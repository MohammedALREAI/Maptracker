import { optionsJWT } from "./../../../utils/decodeJWT";
import { User } from "../../../entities/index";
import {
  EmailSignInMutationArgs,
  EmailSignInResponse,
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
  Mutation: {
    EmailSignIn: async (
      _,
      args: EmailSignInMutationArgs
    ): Promise<EmailSignInResponse> => {
      const { email, password } = args;
      try {
        //cheack use is found
        const user = await User.findOne({ email });

        if (!user) {
          return {
            ok: false,
            error: "No user found with that email",
            token: null,
          };
        }
        //decript the passsword
        const checkPassword = await user.comparePassword(password);
        if (checkPassword) {
          const token = optionsJWT.createJWT(user.id + "");
          return {
            ok: true,
            error: null,
            token,
          };
        } else {
          return {
            ok: false,
            error: "Wrong password  pales enter corrects  password ",
            token: null,
          };
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null,
        };
      }
    },
  },
};
export default resolvers;
