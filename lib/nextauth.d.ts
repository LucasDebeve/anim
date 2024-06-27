import type {DefaultSession} from "next-auth";

declare module "next-auth" {
    /**
     * Returned by 'useSession' and 'getSession' and received as a prop on the 'SessionProvider' React Context
     */
    interface Session {
        user: DefaultSession["user"] & {
            id?: string;
        };
    }
}