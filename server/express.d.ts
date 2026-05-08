// Augment Express namespace so req.user is always available on Request,
// making AuthRequest compatible with standard RequestHandler types.
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        isAdmin: boolean | null;
        firstName?: string | null;
        lastName?: string | null;
        [key: string]: unknown;
      };
    }
  }
}

export {};
