import { ApolloContext } from '../../middleware/context.js';
import { GetUserRequest } from '../../api/types.js';
import handleError from '../utils/handleError.js';

const getUserQuery = async (
  _parent: never,
  args: GetUserRequest,
  context: ApolloContext,
) => {
  try {
    const { message, user } = await context.apiClient.getUser(args);
    return {
      message,
      details: user,
    };
  } catch (err) {
    return handleError(err);
  }
};

export default getUserQuery;
