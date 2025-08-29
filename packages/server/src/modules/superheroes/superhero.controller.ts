import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../../libs/core/base-controller';
import { SuperheroService } from './superhero.service';
import { ImageService } from '../images/image.service';
import fs from 'fs/promises';
import { SuperheroInternalSchema } from '../../libs/common/common';

class SuperheroController extends BaseController {
  private superheroService = new SuperheroService();
  private imageService = new ImageService();

  public getAll = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(req, res, next, async () => {
      const { page, perPage, nickname } = req.query;

      const superheroes = await this.superheroService.getAll(
        parseInt(page as string) || 1,
        parseInt(perPage as string) || 10,
        nickname as string | undefined
      );

      this.sendResponse(res, superheroes, 200);
    });

  public getById = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(req, res, next, async () => {
      const superheroId = req.params.id;
      const superhero = await this.superheroService.getById(superheroId);
      this.sendResponse(res, superhero, 200);
    });

  public create = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(
      req,
      res,
      next,
      async (req: Request, res: Response) => {
        const imageFiles = (req.files as Express.Multer.File[]) || [];
        const uploadedUrls = await Promise.all(
          imageFiles.map((file) => this.imageService.upload(file.path, 'superheroes'))
        );

        await Promise.all(imageFiles.map((file) => fs.unlink(file.path).catch(() => {})));

        const data = {
          ...req.body,
          images: uploadedUrls,
        };

        const newSuperhero = await this.superheroService.create(data);

        this.sendResponse(res, newSuperhero, 201);
      },
      SuperheroInternalSchema
    );

  public update = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(
      req,
      res,
      next,
      async (req: Request, res: Response) => {
        const superheroId = req.params.id;
        const imageFiles = (req.files as Express.Multer.File[]) || [];

        const existingUrls = req.body.existingImages;
        const uploadedUrls = await Promise.all(
          (req.files as Express.Multer.File[]).map((file) => this.imageService.upload(file.path, 'superheroes'))
        );

        await Promise.all(
          imageFiles.map(async (file) => {
            await fs.unlink(file.path);
          })
        );

        const finalImages = [
          ...(Array.isArray(existingUrls) ? existingUrls : typeof existingUrls === 'string' ? [existingUrls] : []),
          ...uploadedUrls,
        ];

        const data = {
          ...req.body,
          images: finalImages,
        };

        const updatedSuperhero = await this.superheroService.update(superheroId, data);

        this.sendResponse(res, updatedSuperhero, 200);
      },
      SuperheroInternalSchema
    );

  public delete = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(req, res, next, async () => {
      const superheroId = req.params.id;
      await this.superheroService.delete(superheroId);
      this.sendResponse(res, {}, 200);
    });
}

export { SuperheroController };
