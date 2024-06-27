import GithubProvider from "next-auth/providers/github"
import {env} from "./env";
import {AuthOptions} from "next-auth";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import {prisma} from "./prisma";

export const authOptions : AuthOptions= {
    adapter: PrismaAdapter(prisma),
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: env.GITHUB_ID,
            clientSecret: env.GITHUB_SECRET,
        }),
        // ...add more providers here
    ],
};