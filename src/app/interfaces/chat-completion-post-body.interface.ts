import { ChatMessageInterface } from "./chat-message.interface";

export interface CharCompletionPostBodyInterface {
    model: string;
    messages: ChatMessageInterface[];
}