const generateUserId = (username: string) => {
  return Buffer.from(username).toString('base64');
};

export default generateUserId;
