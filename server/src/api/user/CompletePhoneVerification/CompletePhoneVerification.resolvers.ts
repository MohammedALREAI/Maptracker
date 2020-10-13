import { optionsJWT } from "./../../../utils/decodeJWT";
import { Verification, User } from "src/entities";
import {
  CompletePhoneVerificationMutationArgs,
  CompletePhoneVerificationResponse,
} from "./../../../types/graph.d";
import { Resolvers } from "./../../../types/resolvers.d";

const resolvers: Resolvers = {
  Mutation: {
    CompletePhoneVerification: async (
      _,
      args: CompletePhoneVerificationMutationArgs
    ): Promise<CompletePhoneVerificationResponse> => {
      const { phoneNumber, key } = args;
      try {
        //  found the number phone with secial key that stored
        const verification = await Verification.findOne({
          payload: phoneNumber,
          key,
        });
        if (!verification) {
          return {
            ok: false,
            error: "Verification key not valid",
            token: null,
          };
        }
        verification.verified = true;
        verification.save();
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null,
        };
      }

      try {
        const user = await User.findOne({ phoneNumber });
        if (!user) {
          return {
            ok: true,
            error: "please login in the application",
            token: null,
          };
        }
        user.verifiedPhoneNumber = true;
        user.save();
        const token = optionsJWT.createJWT(user.id + "");
        return newFunction(token);
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
function newFunction(
  token: string
):
  | CompletePhoneVerificationResponse
  | PromiseLike<CompletePhoneVerificationResponse> {
  return {
    ok: true,
    error: null,
    token,
  };
}
