import { ApolloContext } from '../../middleware/context.js';
import { GetUserListRequest } from '../../api/types.js';
import handleError from '../utils/handleError.js';

const getUserListQuery = async (
  _parent: never,
  { input }: { input: GetUserListRequest },
  context: ApolloContext,
) => {
  try {
    const { message, users, ...paginationData } =
      await context.apiClient.getUserList(input);
    return {
      message,
      users,
      pagination: paginationData,
    };
  } catch (err) {
    return handleError(err);
  }
};

export default getUserListQuery;
