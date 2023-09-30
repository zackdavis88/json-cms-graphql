import { ApolloContext } from '../../middleware/context.js';
import { GetUserListRequest } from '../../api/types.js';
import handleError from '../utils/handleError.js';

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
      list: users,
      pagination: paginationData,
    };
  } catch (err) {
    return handleError(err);
  }
};

export default getUserListQuery;
