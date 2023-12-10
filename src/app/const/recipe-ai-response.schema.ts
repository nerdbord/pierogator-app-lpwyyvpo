/**
 * Schema used for GPT's response
 */
export const RECIPE_AI_RESPONSE_SCHEMA = {
    recipes: [
        {
            ingredients: {
                dough: [
                    {
                        name: 'ingredient name',
                        quantity: 'Ingredient quantity',
                    },
                ],
                filling: [
                    {
                        name: 'ingredient name',
                        quantity: 'Ingredient quantity',
                    }
                ]
            },
            instructions: {
                dough_preparation: ['Dough preparation instruction'],
                filling_preparation: ['Filling preparation instruction'],
                forming_and_cooking_dumplings: ['Forming and cooking dumplings instruction'],
                serving: ['Serving instructions'],
            }
        }
    ]
}
