const environments = {
  development: {
    mysql: {
      host: 'ryangwa.ddns.net',
      port: 13306,
      username: 'nodejs',
      password: 'skfkzk28()',
      database: 'node_api_dev'
    }
  },

  test: {
    mysql: {
      host: 'ryangwa.ddns.net',
      port: 13306,
      username: 'nodejs',
      password: 'skfkzk28()',
      database: 'node_api_test'
    }
  },

  production: {
      host: 'ryangwa.ddns.net',
      port: 13306,
      username: 'nodejs',
      password: 'skfkzk28()',
      database: 'node_api'
  }
}

const nodeEnv = process.env.NODE_ENV || 'development';

module.exports = environments[nodeEnv];
