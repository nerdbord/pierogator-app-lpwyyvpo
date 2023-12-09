import { ChatMessageInterface } from "./chat-message.interface";

export interface ChatCompletionChoicesInterface {
    index: number;
    message: ChatMessageInterface;
    finish_reason: string;
}

export interface ChatCompletionUsageInterface {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
}

export interface ChatCompletionResponseInterface {
    id: string;
    object: string;
    created: number;
    model: string;
    system_fingerprint: string;
    choices: ChatCompletionChoicesInterface[];
    usage: ChatCompletionUsageInterface;
}