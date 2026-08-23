import { Type } from "class-transformer";
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from "class-validator";

export class CreateApartmentDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  @IsNotEmpty()
  address!: string;

  @IsString()
  @IsNotEmpty()
  city!: string;

  @IsString()
  @IsNotEmpty()
  contactPhone!: string;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  price!: number;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  bedrooms!: number;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  bathrooms!: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  area!: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];
}