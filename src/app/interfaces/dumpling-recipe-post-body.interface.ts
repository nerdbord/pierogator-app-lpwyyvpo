import { IngredientTypeEnum, InstructionTypeEnum } from "../enums";
import { DumplingRecipeIngredientInterface } from "./dumpling-recipe-ingredient.interface";

export interface DumplingRecipePostBodyInterface {
    name: string;
    imageSrc: string;
    ingredients?: Record<IngredientTypeEnum, DumplingRecipeIngredientInterface[]>;
    instructions?: Record<InstructionTypeEnum, string[]>;
}