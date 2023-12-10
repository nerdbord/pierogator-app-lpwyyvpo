import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
    ChatCompletionPostBodyInterface,
    ImageGenerationPostBodyInterface,
    ChatCompletionResponseInterface,
    ImageGenerationResponseInterface,
    ChatMessageInterface,
    ChatCompletionChoicesInterface,
} from "../interfaces";
import { BaseApiService } from "./base-api.service";
import { AiRoleEnum } from "../enums";
import { IMAGE_AI_RESPONSE_SCHEMA } from "../const/image-ai-response.schema";
import { RECIPE_AI_RESPONSE_SCHEMA } from '../const/recipe-ai-response.schema';
import { DUMPLING_DESCRITPION_SCHEMA } from "../const";

@Injectable({
    providedIn: 'root',
})
export class OpenAiApiService extends BaseApiService {
    private readonly _url: string = `${this.baseUrl}/openai`;

    /**
     * Creates an image given a prompt
     * @param body 
     * @returns 
     */
    public postImageGeneration(body: ImageGenerationPostBodyInterface): Observable<ImageGenerationResponseInterface> {
        const url: string = `${this._url}/images/generations`;

        return this.httpClient.post<ImageGenerationResponseInterface>(
            url,
            {
                ...body,
                prompt: this._forceImageResponseType(IMAGE_AI_RESPONSE_SCHEMA, body.prompt),
            } as ImageGenerationPostBodyInterface,
            {
                headers: this.gptBaseHeaders,
            });
    }

    /**
     * Creates a model response for the given chat conversation
     * @param body 
     * @returns 
     */
    public postChatCompletion(body: ChatCompletionPostBodyInterface): Observable<ChatCompletionResponseInterface> {
        const url: string = `${this._url}/chat/completions`;
        const messages: ChatMessageInterface[] = this._forceMessageResponseType(RECIPE_AI_RESPONSE_SCHEMA, body.messages);

        return this.httpClient.post<ChatCompletionResponseInterface>(
            url,
            {
                ...body,
                messages,
            } as ChatCompletionPostBodyInterface,
            {
                headers: this.gptBaseHeaders
            }
        );
    }
    
    /**
     * Creates a model response for the given chat conversation
     * @param body 
     * @returns 
     */
    public postChatCompletionWithoutSchema(body: ChatCompletionPostBodyInterface): Observable<ChatCompletionResponseInterface> {
        const url: string = `${this._url}/chat/completions`;
        return this.httpClient.post<ChatCompletionResponseInterface>(
            url,
            {
                ...body,
            } as ChatCompletionPostBodyInterface,
            {
                headers: this.gptBaseHeaders
            }
        );
    }

    /**
    * Creates a model response for the given chat conversation
    * @param body 
    * @returns 
    */
    public postChatCompletionForDumplingDesc(body: ChatCompletionPostBodyInterface): Observable<ChatCompletionResponseInterface> {
        const url: string = `${this._url}/chat/completions`;
        const messages: ChatMessageInterface[] = this._forceMessageResponseType(DUMPLING_DESCRITPION_SCHEMA, body.messages);

        return this.httpClient.post<ChatCompletionResponseInterface>(
            url,
            {
                ...body,
                messages,
            } as ChatCompletionPostBodyInterface,
            {
                headers: this.gptBaseHeaders
            }
        );
    }

    /**
     * Parse AI message to JS object
     * @param choice choice object from AI response
     * @returns parsed object of <T> type
     */
    public getParsedMessage<T>(choice: ChatCompletionChoicesInterface): T {
        return JSON.parse(choice.message.content);
    }

    /**
     * Forces OpenAI to generate image with interface provided in <typeDef> definition
     * @param typeDef response type definition
     * @param prompt user input
     * @returns prompt with forced response type
     */
    private _forceImageResponseType(typeDef: unknown, prompt: string): string {
        const assistantPrompt: string = `Use JSON format only with interface like ${JSON.stringify(typeDef)}. `;

        return `${assistantPrompt} ${prompt}`;
    }

    /**
     * Forces OpenAI to answer message with interface provided by <typeDef> definition
     * @param typeDef response type definition
     * @param messages messages from user
     * @returns array of messages with forced response type
     */
    private _forceMessageResponseType(typeDef: unknown, messages: ChatMessageInterface[]): ChatMessageInterface[] {
        const assistantMessage: ChatMessageInterface = {
            role: AiRoleEnum.USER,
            content: `
                Force JSON format contains data with interface below: 
                ${JSON.stringify(typeDef)}.
            `
        };

        return [assistantMessage, ...messages];
    }
}