import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { createAuthMiddleware, APIError } from "better-auth/api";
import { admin, customSession } from "better-auth/plugins";
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  trustedOrigins: [
    process.env.FRONTEND_URL as string,
    process.env.ADMIN_URL as string,
    process.env.BETTER_AUTH_URL as string,
  ],
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (
        ctx.path === "/sign-in/email" &&
        ((ctx.headers?.get("origin") === process.env.ADMIN_URL &&
          ctx.body?.email !== process.env.ADMIN_EMAIL) ||
          (ctx.headers?.get("origin") === process.env.FRONTEND_URL &&
            ctx.body?.email === process.env.ADMIN_EMAIL))
      ) {
        throw new APIError("UNAUTHORIZED", {
          message: "You are not authorized to access this resource.",
          status: 403,
        });
      }
    }),
  },
  plugins: [
    admin(),
    customSession(async ({ user, session }) => {
      const userRole = await prisma.user.findUnique({
        where: { id: user.id },
        select: { role: true },
      });
      return {
        session,
        user: {
          ...user,
          role: userRole?.role || "USER",
        },
      };
    }),
  ],
});
