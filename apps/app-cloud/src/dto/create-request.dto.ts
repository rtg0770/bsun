import { CreateRequestDto as SharedCreateRequestDto } from '@bishub-energy/shared-types';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateRequestDto extends SharedCreateRequestDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  // ... other properties with additional decorators
}
