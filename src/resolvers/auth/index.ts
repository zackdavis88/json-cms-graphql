import generateTokenQuery from './generateToken.js';
import authenticateTokenQuery from './authenticateToken.js';

export default {
  Query: {
    generateToken: generateTokenQuery,
    authenticateToken: authenticateTokenQuery,
  },
};
