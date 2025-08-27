import { z } from 'zod';

export const SuperheroCreateRequestSchema = z.object({
  nickname: z
    .string()
    .min(1, { message: 'Nickname is required.' })
    .max(50, { message: 'Nickname must be at most 50 characters.' }),

  realName: z
    .string()
    .min(1, { message: 'Real name is required.' })
    .max(50, { message: 'Real name must be at most 50 characters.' }),

  originDescription: z
    .string()
    .min(1, { message: 'Origin description is required.' })
    .max(500, { message: 'Origin description must be at most 500 characters.' }),

  superpowers: z
    .string()
    .min(1, { message: 'Superpowers are required.' })
    .max(500, { message: 'Superpowers must be at most 500 characters.' }),

  catchPhrase: z
    .string()
    .min(1, { message: 'Catch phrase is required.' })
    .max(200, { message: 'Catch phrase  must be at most 200 characters.' }),

  images: z
    .array(z.instanceof(File))
    .min(1, { message: 'At least one image is required.' })
    .max(10, { message: 'No more than 10 images are allowed.' }),
});
