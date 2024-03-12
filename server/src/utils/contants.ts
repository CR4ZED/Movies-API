const development = {
  domain: 'localhost:3000',
  Database: {
    connectionUrl: 'mongodb://localhost:27017',
    name: 'movie'
  }
};

const staging = {
  // add staging domain url
  domain: 'localhost:3000',
  Database: {
    connectionUrl: '',
    name: 'movie'
  }
};

const production = {
  // add prod domain url
  domain: 'localhost:3000',
  Database: {
    connectionUrl: '',
    name: 'movie'
  }
};

function getConfig() {
  const mode = process.env.NODE_ENV;
  switch (mode) {
    case 'dev':
      return Object.assign({}, development);
    case 'staging':
      return Object.assign({}, staging);
    case 'production':
      return Object.assign({}, production);
    default:
      return Object.assign({}, development);
  }
}

export default getConfig();
