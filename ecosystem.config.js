module.exports = {
  apps: [
    {
      name: 'backend-api',
      script: './backend/node_modules/.bin/ts-node',
      args: './backend/src/index.ts',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }
  ],

  deploy: {
    production: {
      user: 'ubuntu',
      host: '3.223.71.28',
      ref: 'origin/main',
      repo: 'git@github.com:klevergj/Backend_Testing.git',
      path: '/var/www/tu-app',
      'post-deploy': 'cd backend && npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};