import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import connect from "@/utils/connect";
import NextAuth from "next-auth";

/**
 * @Author Santi Rijal
 */

// Handle user signin with next auth providers.
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials) {
        // Connect to db
        await connect();

        try {
          // Check if user exists
          const user = await User.findOne({
            email: credentials.email,
          });

          if (user) {
            // If user exists, check password by comparing using bcrypt.
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );

            // If password is correct return user, else throw error.
            if (isPasswordCorrect) {
              return user;
            } else {
              throw new Error("User not found!");
            }
          } else {
            throw new Error("User not found!");
          }
        } catch (err) {
          throw new Error(err);
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };
