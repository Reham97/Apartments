import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';

import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { extname, join } from 'path';

import { ApartmentsService } from './apartments.service';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { QueryApartmentsDto } from './dto/query-apartments.dto';

@ApiTags('Apartments')
@Controller('apartments')
export class ApartmentsController {
  constructor(private readonly apartmentsService: ApartmentsService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new apartment with multiple images' })
  @ApiCreatedResponse({ description: 'Apartment created successfully' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          example: 'Luxury Apartment',
        },
        description: {
          type: 'string',
          example: 'Beautiful apartment with Nile view',
        },
        price: {
          type: 'number',
          example: 5000,
        },
        address: {
          type: 'string',
          example: '123 Nile Street',
        },
        city: {
          type: 'string',
          example: 'Cairo',
        },
        contactPhone: {
          type: 'string',
          example: '+201012345678',
        },
        bedrooms: {
          type: 'number',
          example: 3,
        },
        bathrooms: {
          type: 'number',
          example: 2,
        },
        area: {
          type: 'number',
          example: 180,
        },
        images: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
      required: [
        'title',
        'price',
        'address',
        'city',
        'contactPhone',
        'bedrooms',
        'bathrooms',
        'area',
      ],
    },
  })
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: (req, file, callback) => {
          const uploadPath = join(
            process.cwd(),
            'uploads',
            'apartments',
          );

          // Create uploads/apartments automatically
          if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath, {
              recursive: true,
            });
          }

          callback(null, uploadPath);
        },

        filename: (req, file, callback) => {
          const uniqueName = `${Date.now()}-${Math.round(
            Math.random() * 1e9,
          )}`;

          callback(
            null,
            `${uniqueName}${extname(file.originalname)}`,
          );
        },
      }),
    }),
  )
  create(@Body() createApartmentDto: CreateApartmentDto, @UploadedFiles() files: Express.Multer.File[] = []) {
    return this.apartmentsService.create(createApartmentDto, files);
  }


  @Get()
  @ApiOperation({ summary: 'Get all apartments' })
  @ApiOkResponse({ description: 'Apartments retrieved successfully' })
  findAll(@Query() query: QueryApartmentsDto) {
    return this.apartmentsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get apartment by ID' })
  @ApiOkResponse({ description: 'Apartment retrieved successfully' })
  @ApiNotFoundResponse({ description: 'Apartment not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.apartmentsService.findOne(id);
  }
}