import { type IncomingMessage, type ServerResponse } from 'http';

export interface TerraformerContext {
  authToken?: string;
}

export const context = async ({
  req,
  res,
}: {
  req: IncomingMessage;
  res: ServerResponse;
}) => {
  return {
    req,
    res,
    authToken: req.headers['x-auth-token'],
  };
};
