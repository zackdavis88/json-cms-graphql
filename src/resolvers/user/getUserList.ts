import { ApolloContext } from '../../middleware/context.js';
import { GetUserListRequest } from '../../api/types.js';
import handleError from '../utils/handleError.js';
import generateUserId from '../utils/generateUserId.js';

const getUserListQuery = async (
  _parent: never,
  args: GetUserListRequest,
  context: ApolloContext,
) => {
  try {
    const { message, users, ...paginationData } =
      await context.apiClient.getUserList(args);
    return {
      message,
      list: users.map((user) => ({
        id: generateUserId(user.username),
        ...user,
      })),
      pagination: paginationData,
    };
  } catch (err) {
    return handleError(err);
  }
};

export default getUserListQuery;
