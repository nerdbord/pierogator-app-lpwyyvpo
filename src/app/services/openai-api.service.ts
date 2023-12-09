import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
    CharCompletionPostBodyInterface,
    ImageGenerationPostBodyInterface,
    ChatCompletionResponseInterface,
    ImageGenerationResponseInterface,
} from "../interfaces";
import { BaseApiService } from "./base-api.service";

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

        return this.httpClient.post<ImageGenerationResponseInterface>(url, body, { headers: this.baseHeaders });
    }

    /**
     * Creates a model response for the given chat conversation
     * @param body 
     * @returns 
     */
    public postChatCompletion(body: CharCompletionPostBodyInterface): Observable<ChatCompletionResponseInterface> {
        const url: string = `${this._url}/chat/completions`;

        return this.httpClient.post<ChatCompletionResponseInterface>(url, body, { headers: this.baseHeaders });
    }
}