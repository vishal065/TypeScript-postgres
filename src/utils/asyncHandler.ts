import { Request, Response, NextFunction, RequestHandler } from "express";

// const asyncHandler = (
//   func: (req: Request, res: Response, next: NextFunction) => Promise<any>
// ): RequestHandler => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     Promise.resolve(func(req, res, next)).catch(next);
//   };
// };

class asyncHandler {
  static handler(
    fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
  ): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
      Promise.resolve(fn(req, res, next)).catch((err) => {
        console.log("error", err);
        next(err);
      });
    };
  }
}

export default asyncHandler.handler;
// import { Request, Response, NextFunction, RequestHandler } from "express";

// class AsyncHandler {
//   static handle(
//     func: (req: Request, res: Response, next: NextFunction) => Promise<any>
//   ): RequestHandler {
//     return (req: Request, res: Response, next: NextFunction) => {
//       Promise.resolve(func(req, res, next)).catch((err) => {
//         // You can add logging here or do anything with the error before passing to the next middleware
//         console.error("Error occurred in async handler:", err);
//         next(err); // Pass the error to the next middleware
//       });
//     };
//   }
// }

// export default AsyncHandler;
