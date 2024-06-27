import GithubProvider from "next-auth/providers/github"
import {env} from "./env";

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: env.GITHUB_ID,
            clientSecret: env.GITHUB_SECRET,
        }),
        // ...add more providers here
    ],
};