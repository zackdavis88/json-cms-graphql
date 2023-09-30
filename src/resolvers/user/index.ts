import createUserMutation from './createUser.js';
import getUserQuery from './getUser.js';
import getUserListQuery from './getUserList.js';

export default {
  Query: {
    user: getUserQuery,
    users: getUserListQuery,
  },
  Mutation: {
    createUser: createUserMutation,
  },
};
