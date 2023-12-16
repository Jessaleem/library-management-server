import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  JWTSECRET: get('JWT_SECRET').required().asString(),
};
