import { optionsJWT } from "./../../../utils/decodeJWT";
import { EmailHandle } from "./../../../utils/sendEmail";
import { TargetType } from "./../../../types/type.d";
import { User, Verification } from "src/entities";
import {
  EmailSignUpMutationArgs,
  EmailSignUpResponse,
} from "./../../../types/graph.d";
import { Resolvers } from "./../../../types/resolvers.d";
const resolvers: Resolvers = {
  Mutation: {
    EmailSignUp: async (
      _,
      args: EmailSignUpMutationArgs
    ): Promise<EmailSignUpResponse> => {
      const { email } = args;
      //find the user ans scheck in found or not
      try {

        const existingUser = await User.findOne({ email });
        //cheack if user login the site
        if (existingUser) {
          return {
            ok: false,
            error: "You should log in instead",
            token: null,
          };
        } else {
          const phoneVerification = await Verification.findOne({
            payload: args.phoneNumber,
            verified: true,
          });
          if (phoneVerification) {
            const newUser = await User.create({ ...args }).save();
            if (newUser.email) {
              const emailVerification = await Verification.create({
                payload: newUser.email,
                target: TargetType.Email,
              }).save();
              await EmailHandle.sendVerificationEmail(
                newUser.fullName,
                emailVerification.key
              );
            }
            const token = optionsJWT.createJWT(String(newUser.id));
            return {
              ok: true,
              error: null,
              token,
            };
          } else {
            return {
              ok: false,
              error: "You haven't verified your phone number",
              token: null,
            };
          }
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
