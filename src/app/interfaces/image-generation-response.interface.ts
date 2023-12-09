export interface ImageGenerationDataInterface {
    url: string;
}

export interface ImageGenerationResponseInterface {
    created: number;
    data: ImageGenerationDataInterface[];
}