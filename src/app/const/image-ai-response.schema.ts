import { ImageGenerationResponseInterface } from "../interfaces";

/**
 * Schema used for DALL-E's response
 */
export const IMAGE_AI_RESPONSE_SCHEMA: ImageGenerationResponseInterface = {
    created: 0,
    data: [
        {
            url: 'string',
        }
    ]
}