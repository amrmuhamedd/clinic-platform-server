export {};

declare global {
  namespace Express {
    export interface Request {
      user?: { _id: number; name: string; email: string; role: string };
    }
  }
}
