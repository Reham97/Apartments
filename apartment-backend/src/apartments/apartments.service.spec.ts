import { Test, TestingModule } from '@nestjs/testing';
import { ApartmentsService } from './apartments.service';
import { PrismaService } from '../prisma/prisma.service';

const mockPrismaService = {
  apartment: {
    create: jest.fn(),
    findMany: jest.fn(),
    count: jest.fn(),
  },
};

describe('ApartmentsService', () => {
  let service: ApartmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApartmentsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<ApartmentsService>(ApartmentsService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and return an apartment', async () => {
      const createApartmentDto = {
        title: 'Modern Apartment',
        description: 'Nice apartment',
        address: 'Street 9',
        city: 'Cairo',
        price: 2500000,
        bedrooms: 3,
        bathrooms: 2,
        area: 150,
      };

      const createdApartment = {
        id: 1,
        ...createApartmentDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.apartment.create.mockResolvedValue(createdApartment);

      const result = await service.create(createApartmentDto);

      expect(result).toEqual(createdApartment);

      expect(mockPrismaService.apartment.create).toHaveBeenCalledWith({
        data: createApartmentDto,
      });
    });
  });

  describe('findAll', () => {
    it('should return paginated apartments', async () => {
      const query = {
        page: 1,
        limit: 10,
      };

      const apartments = [
        {
          id: 1,
          title: 'Modern Apartment',
          description: 'Nice apartment',
          address: 'Street 9',
          city: 'Cairo',
          price: 2500000,
          bedrooms: 3,
          bathrooms: 2,
          area: 150,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockPrismaService.apartment.findMany.mockResolvedValue(apartments);
      mockPrismaService.apartment.count.mockResolvedValue(1);

      const result = await service.findAll(query);

      expect(result).toEqual({
        data: apartments,
        meta: {
          total: 1,
          page: 1,
          limit: 10,
          totalPages: 1,
        },
      });

      expect(mockPrismaService.apartment.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          skip: 0,
          take: 10,
        }),
      );

      expect(mockPrismaService.apartment.count).toHaveBeenCalledWith(
        expect.anything(),
      );
    });
  });
});
