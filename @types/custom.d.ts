declare namespace Express {
  interface Request {
    userId: number | null | undefined;
    signedCookies: { login: string | undefined };
  }
}