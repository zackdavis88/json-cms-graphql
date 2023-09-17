import { type TerraformerContext } from 'src/middleware/context';

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

const getBookResolver = (
  _parent: unknown,
  args: { id: number },
  context: TerraformerContext,
) => {
  console.log(context.authToken);
  return books.find((book) => book.id === args.id);
};

export default {
  Query: {
    books: getBooksResolver,
    book: getBookResolver,
  },
};
