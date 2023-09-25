import createUserMutation from './createUser.js';
import getUserQuery from './getUser.js';
import getUserListQuery from './getUserList.js';

export default {
  Query: {
    getUser: getUserQuery,
    getUserList: getUserListQuery,
  },
  Mutation: {
    createUser: createUserMutation,
  },
};
