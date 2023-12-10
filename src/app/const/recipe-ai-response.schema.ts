/**
 * Schema used for GPT's response
 */
export const RECIPE_AI_RESPONSE_SCHEMA = {
    recipes: [
        {
            ingredients: {
                dough: [
                    {
                        name: 'string',
                        quantity: 'string',
                    },
                ],
                filling: [
                    {
                        name: 'string',
                        quantity: 'string',
                    }
                ]
            },
            instructions: {
                dough_preparation: ['string'],
                filling_preparation: ['string'],
                forming_and_cooking_dumplings: ['string'],
                serving: ['string'],
            }
        }
    ]
}
