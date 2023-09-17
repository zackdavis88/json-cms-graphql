import { type IncomingMessage, type ServerResponse } from 'http';
import { type BaseContext } from '@apollo/server';

export interface TerraformerContext extends BaseContext {
  req: IncomingMessage;
  res: ServerResponse<IncomingMessage>;
}

export const createContext = async ({
  req,
  res,
}: {
  req: IncomingMessage;
  res: ServerResponse;
}) => {
  return {
    req,
    res,
  };
};
