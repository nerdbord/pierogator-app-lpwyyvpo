export interface ImageGenerationPostBodyInterface {
    model?: string;
    prompt: string;
    n: number;
    size: `${number}x${number}`;
}