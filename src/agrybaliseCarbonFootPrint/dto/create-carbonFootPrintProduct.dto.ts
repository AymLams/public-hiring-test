import { IsNotEmpty, IsString, } from 'class-validator';

export class CreateAgrybalyiseCarbonFootPrintDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    recipe: IngredientDto[];
}

export class IngredientDto {
    name: string;
    quantity: number;
    unit: string;
}

export class GetCFPPerProduct {
    food: string
}