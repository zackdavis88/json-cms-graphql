import { TerraformerContext } from '../../middleware/context.js';
import { ApiError } from '../../api-client.js';

const books = [
  {
    id: 1,
    title: 'The Awakening',
    author: {
      name: 'Kate Chopin',
    },
  },
  {
    id: 2,
    title: 'City of Glass',
    author: {
      name: 'Paul Auster',
    },
  },
];

const getBooksResolver = () => {
  return books;
};

const getBookResolver = async (
  _parent: unknown,
  args: { id: number },
  context: TerraformerContext,
) => {
  try {
    const { message, user } = await context.apiClient.createUser({
      username: 'booya',
      password: 'Password1',
    });
    console.log(message);
    console.log(user);
  } catch (err) {
    if (err instanceof ApiError) {
      console.log(err.error);
      console.log(err.errorType);
    }
  }

  return books.find((book) => book.id === args.id);
};

export default {
  Query: {
    books: getBooksResolver,
    book: getBookResolver,
  },
};
