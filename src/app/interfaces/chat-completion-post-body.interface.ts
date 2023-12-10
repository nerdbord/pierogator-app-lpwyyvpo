import { AiModelEnum } from "../enums";
import { ChatMessageInterface } from "./chat-message.interface";

export interface ChatCompletionPostBodyInterface {
    model: AiModelEnum;
    messages: ChatMessageInterface[];
}