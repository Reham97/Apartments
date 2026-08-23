import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { QueryApartmentsDto } from './dto/query-apartments.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ApartmentsService {
  private readonly baseUrl = process.env.BASE_URL;

  constructor(private readonly prisma: PrismaService) {
      console.log('ApartmentsService baseUrl:', this.baseUrl);
  }

  /**
   * Convert relative image paths to full URLs.
   */
  private formatApartment(  apartment: Prisma.ApartmentGetPayload<Record<string, never>> ) {
    return {
      ...apartment,
      images: apartment.images.map((image) => {
        // Avoid duplicating the URL if it is already absolute
        if (image.startsWith('http://') || image.startsWith('https://')) {
          return image;
        }

        return `${this.baseUrl}${image}`;
      }),
    };
  }

  /**
   * CREATE APARTMENT + SAVE IMAGE PATHS
   */
  async create(
    createApartmentDto: CreateApartmentDto,
    files: Express.Multer.File[] = [],
  ) {
    const images = files.map(
      (file) => `/uploads/apartments/${file.filename}`,
    );

    const apartment = await this.prisma.apartment.create({
      data: {
        ...createApartmentDto,
        images,
      },
    });

    return this.formatApartment(apartment);
  }

  /**
   * GET ALL APARTMENTS WITH FILTERS + PAGINATION
   */
  async findAll(query: QueryApartmentsDto) {
    const {
      page = 1,
      limit = 10,
      city,
      minPrice,
      maxPrice,
      bedrooms,
    } = query;

    const skip = (page - 1) * limit;

    const where: Prisma.ApartmentWhereInput = {
      ...(city && {
        city: {
          equals: city,
          mode: 'insensitive',
        },
      }),

      ...(minPrice !== undefined || maxPrice !== undefined
        ? {
            price: {
              ...(minPrice !== undefined && {
                gte: minPrice,
              }),
              ...(maxPrice !== undefined && {
                lte: maxPrice,
              }),
            },
          }
        : {}),

      ...(bedrooms !== undefined && {
        bedrooms,
      }),
    };

    const [apartments, total] = await Promise.all([
      this.prisma.apartment.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),

      this.prisma.apartment.count({
        where,
      }),
    ]);

    return {
      data: apartments.map((apartment) =>
        this.formatApartment(apartment),
      ),

      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * GET ONE APARTMENT
   */
  async findOne(id: number) {
    const apartment = await this.prisma.apartment.findUnique({
      where: {
        id,
      },
    });

    if (!apartment) {
      throw new NotFoundException(
        `Apartment with ID ${id} not found`,
      );
    }

    return this.formatApartment(apartment);
  }
}