import { IngredientTypeEnum, InstructionTypeEnum } from "../enums";
import { DumplingRecipeIngredientInterface } from "./dumpling-recipe-ingredient.interface";

export interface DumplingRecipeInterface {
    _id: string;
    name: string;
    imageSrc: string;
    author: string;
    ingredients: Record<IngredientTypeEnum, DumplingRecipeIngredientInterface[]>;
    instructions: Record<InstructionTypeEnum, string[]>;
}

export interface DumplingRecipesResponseInterface {
    recipes: DumplingRecipeInterface[];
}