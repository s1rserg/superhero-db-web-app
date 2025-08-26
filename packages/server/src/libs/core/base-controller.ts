import { Request, Response, NextFunction } from 'express';
import { ZodType } from 'zod';

export abstract class BaseController {
  protected async handleRequest<T extends Record<string, unknown>>(
    req: Request,
    res: Response,
    next: NextFunction,
    handler: (req: Request, res: Response) => Promise<void>,
    schema?: ZodType<T>
  ) {
    try {
      if (schema) {
        if (typeof req.body === 'string') {
          const parsedBody = JSON.parse(req.body);

          const { images, ...jsonFields } = parsedBody;

          req.body = {
            ...this.validate(schema, jsonFields),
            images,
          };
        } else {
          req.body = this.validate(schema, req.body);
        }
      }

      await handler(req, res);
    } catch (error) {
      next(error);
    }
  }

  protected validate<T extends Record<string, unknown>>(schema: ZodType<T>, data: unknown): T {
    return schema.parse(data);
  }

  protected sendResponse(res: Response, data: unknown, statusCode = 200) {
    res.status(statusCode).json(data);
  }
}
