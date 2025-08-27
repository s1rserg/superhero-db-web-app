import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../../libs/core/base-controller';
import { SuperheroService } from './superhero.service';
import { ImageService } from '../images/image.service';
import fs from 'fs/promises';

class SuperheroController extends BaseController {
  private superheroService = new SuperheroService();
  private imageService = new ImageService();

  public getAll = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(req, res, next, async () => {
      const { page, perPage } = req.query;
      const superheroes = await this.superheroService.getAll(
        parseInt(page as string) || 1,
        parseInt(perPage as string) || 10
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
    this.handleRequest(req, res, next, async (req: Request, res: Response) => {
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
    });

  public update = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(req, res, next, async (req: Request, res: Response) => {
      const superheroId = req.params.id;
      const imageFiles = (req.files as Express.Multer.File[]) || [];

      let imagesUrls: string[] = [];
      if (req.body.images) {
        try {
          imagesUrls = Array.isArray(req.body.images) ? req.body.images : JSON.parse(req.body.images);
        } catch {
          imagesUrls = [req.body.images];
        }
      }

      const uploadedUrls = await Promise.all(
        imageFiles.map((file) => this.imageService.upload(file.path, 'superheroes'))
      );

      await Promise.all(imageFiles.map((file) => fs.unlink(file.path).catch(() => {})));

      const finalImages = [...imagesUrls, ...uploadedUrls];

      const data = {
        ...req.body,
        images: finalImages,
      };

      const updatedSuperhero = await this.superheroService.update(superheroId, data);

      this.sendResponse(res, updatedSuperhero, 200);
    });

  public delete = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(req, res, next, async () => {
      const superheroId = req.params.id;
      await this.superheroService.delete(superheroId);
      this.sendResponse(res, {}, 200);
    });
}

export { SuperheroController };
