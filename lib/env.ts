import {createEnv} from '@t3-oss/env-nextjs';
import {z} from 'zod';

export const env = createEnv({
    server: {
        GITHUB_ID: z.string().min(1),
        GITHUB_SECRET: z.string().min(1),
        FACEBOOK_ID: z.string().min(1),
        FACEBOOK_SECRET: z.string().min(1),
    },
    client: {},
    runtimeEnv: {
        GITHUB_ID: process.env.GITHUB_ID,
        GITHUB_SECRET: process.env.GITHUB_SECRET,
        FACEBOOK_ID: process.env.FACEBOOK_ID,
        FACEBOOK_SECRET: process.env.FACEBOOK_SECRET,
    },
})