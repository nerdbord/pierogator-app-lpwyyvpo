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
                dough_preparation: ['Recipe in steps of dough preparation instruction'],
                filling_preparation: ['Recipe in steps of filling preparation instruction'],
                forming_and_cooking_dumplings: ['Recipe in steps of forming and cooking dumplings instruction'],
                serving: ['Serving instructions'],
            }
        }
    ]
}
