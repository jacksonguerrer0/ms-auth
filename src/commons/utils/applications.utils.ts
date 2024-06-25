
const isAppEnv = (env: string) => process.env.APP_ENV === env;

export const isLocalEnv = () => isAppEnv('local');