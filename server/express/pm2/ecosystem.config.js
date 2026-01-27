module.exports = {
  apps: [
    {
      name: 'pm2-express',
      script: './pm2-express/index.js',
      watch: './pm2-express',
      // it switches to the cluster mode
      instances: 'max',
      // instances: 1,
      watch: true,
      autorestart: true,
      env: {
        PORT: 3000,
        NODE_ENV: 'development'
      },
      env_production: {
        PORT: 3001,
        NODE_ENV: 'production'
      }
    },
    {
      name: 'pm2-react',
      script: 'serve',
      args: '--spa',
      autorestart: true,
      env: {
        PM2_SERVE_PATH: './pm2-react/build',
        PM2_SERVE_PORT: 3002,
        NODE_ENV: 'development'
      },
      env_production: {
        PM2_SERVE_PATH: './pm2-react/build',
        PM2_SERVE_PORT: 3003,
        NODE_ENV: 'production'
      }
    }
  ]
};
