import path from 'path';

export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  // Redirect Strapi temp folder to project-local ./temp
  paths: {
    temp: path.resolve(__dirname, '..', 'temp'),
  },
});
