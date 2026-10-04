import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/lib/db";

export const authOptions = {
  adapter: PrismaAdapter(db),
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.emailVerified = user.emailVerified;
        token.id = user.id;
        token.image = user.image;
        token.name = user.name;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.email = token.email;
        session.user.emailVerified = token.emailVerified;
        session.user.id = token.id;
        session.user.image = token.image;
        session.user.name = token.name;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: { signIn: "/login" },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        console.log("authorize: nhận thông tin đăng nhập", credentials?.email);

        if (!credentials?.email || !credentials?.password) {
          console.log(
            "authorize: kiểm tra 1 thất bại — thiếu email hoặc mật khẩu",
          );
          throw new Error("Vui lòng nhập email và mật khẩu");
        }
        console.log("authorize: đạt kiểm tra 1");

        const existingUser = await db.user.findUnique({
          where: { email: credentials.email.trim() },
        });

        if (!existingUser) {
          console.log(
            "authorize: kiểm tra 2 thất bại — không tìm thấy người dùng",
          );
          throw new Error("Email hoặc mật khẩu không đúng");
        }
        console.log("authorize: đạt kiểm tra 2");

        if (!existingUser.password) {
          console.log(
            "authorize: kiểm tra 3 thất bại — người dùng chưa có mật khẩu",
          );
          throw new Error("Email hoặc mật khẩu không đúng");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          existingUser.password,
        );

        if (!isPasswordValid) {
          console.log("authorize: kiểm tra 3 thất bại — mật khẩu không khớp");
          throw new Error("Email hoặc mật khẩu không đúng");
        }
        console.log("authorize: đạt kiểm tra 3");

        const user = {
          email: existingUser.email,
          emailVerified: existingUser.emailVerified,
          id: existingUser.id,
          image: existingUser.image,
          name: existingUser.name,
          role: existingUser.role,
        };

        console.log("authorize: đối tượng người dùng", user);
        return user;
      },
      credentials: {
        email: { label: "Địa chỉ email", type: "email" },
        password: { label: "Mật khẩu", type: "password" },
      },
      name: "Đăng nhập bằng mật khẩu",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
};
