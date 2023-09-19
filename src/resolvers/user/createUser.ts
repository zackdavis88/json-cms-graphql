import { ApolloContext } from '../../middleware/context.js';
import { CreateUserRequest } from '../../api/types.js';
import handleError from '../utils/handleError.js';

const createUserMutation = async (
  _parent: unknown,
  { input }: { input: CreateUserRequest },
  context: ApolloContext,
) => {
  try {
    const { message, user } = await context.apiClient.createUser(input);
    return {
      message: message,
      user: {
        displayName: user.displayName,
        username: user.username,
        createdOn: user.createdOn,
      },
    };
  } catch (err) {
    return handleError(err);
  }
};

export default createUserMutation;
