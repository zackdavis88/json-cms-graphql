import { glob } from 'glob';
import { readFileSync } from 'fs';

// Read all GraphQL type files in the schema folder, including the Query/Mutation types in root.type.graphql
const schemaFiles = await glob('src/schema/**/*.type.graphql');

const typeDefs = schemaFiles.reduce((prev, file) => {
  const fileContents = readFileSync(file, { encoding: 'utf-8' });
  return prev.concat(fileContents);
}, '');

export default typeDefs;
