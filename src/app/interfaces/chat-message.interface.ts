import { AiRoleEnum } from "../enums";

export interface ChatMessageInterface {
    role: AiRoleEnum;
    content: string;
}