import { ApolloContext } from '../../middleware/context.js';
import handleError from '../utils/handleError.js';
import generateUserId from '../utils/generateUserId.js';

const generateToken = async (_parent: never, _args: never, context: ApolloContext) => {
  try {
    const authorizationHeader = context.req.headers['x-auth-basic'];
    let headerValue = '';
    if (Array.isArray(authorizationHeader)) {
      headerValue = authorizationHeader[0];
    } else if (authorizationHeader) {
      headerValue = authorizationHeader;
    }

    const { message, authToken, user } =
      await context.apiClient.generateToken(headerValue);

    return {
      message,
      token: authToken,
      user: {
        id: generateUserId(user.username),
        ...user,
      },
    };
  } catch (err) {
    return handleError(err);
  }
};

export default generateToken;
