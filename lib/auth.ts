import GithubProvider from "next-auth/providers/github"
import FacebookProvider from "next-auth/providers/facebook";
import {env} from "./env";
import {AuthOptions, getServerSession} from "next-auth";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import {prisma} from "./prisma";

export const authOptions : AuthOptions= {
    adapter: PrismaAdapter(prisma),
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: env.GITHUB_ID,
            clientSecret: env.GITHUB_SECRET,
            profile(profile) {
                return {
                    id: profile.id.toString(),
                    username: profile.login,
                    name: profile.name,
                    email: profile.email,
                    image: profile.avatar_url,
                }
            },
        }),
        FacebookProvider({
            clientId: env.FACEBOOK_ID,
            clientSecret: env.FACEBOOK_SECRET,
        }),
        // ...add more providers here
    ],
    callbacks: {
        session({session, user}) {
            if (!session?.user) return session;
            session.user.id = user.id;
            return session;
        }
    }
};

export async function getAuthSession() {
    return await getServerSession(authOptions);
}