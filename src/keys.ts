import { getEnvVar } from "./utils/env.js";

export const Keys = {
    clientToken: getEnvVar('BOT_TOKEN'),
} as const;

export default Keys;