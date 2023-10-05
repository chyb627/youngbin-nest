import { registerAs } from '@nestjs/config';

export default registerAs('swagger', async () => {
  return {
    user: process.env.SWAGGER_USER || 'yb',
    password: process.env.SWAGGER_PASSWORD || '1234',
  };
});
