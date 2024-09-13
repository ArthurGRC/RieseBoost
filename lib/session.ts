export const sessionOptions = {
  password: process.env.SALT_SECRET as string,
  cookieName: process.env.COOKIES_NAME as string,
};
