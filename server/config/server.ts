export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),           // allow external connections
  port: env.int('PORT', 1337),            // server port
  url: env('PUBLIC_URL', 'http://localhost:1337/'), // <-- set your domain
  app: {
    keys: env.array('APP_KEYS'),
  },
});