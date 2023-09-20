import { ApolloContext } from '../../middleware/context.js';
import handleError from '../utils/handleError.js';

const authenticateToken = async (
  _parent: never,
  _args: never,
  context: ApolloContext,
) => {
  try {
    const tokenHeader = context.req.headers['x-auth-token'];
    let headerValue = '';
    if (Array.isArray(tokenHeader)) {
      headerValue = tokenHeader[0];
    } else if (tokenHeader) {
      headerValue = tokenHeader;
    }

    const { message, user } = await context.apiClient.authenticateToken(headerValue);

    return {
      message,
      user,
    };
  } catch (err) {
    return handleError(err);
  }
};

export default authenticateToken;
