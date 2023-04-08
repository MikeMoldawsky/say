import { BotConfigInternal } from "../IBotConfigurationRepository";

export interface OpenAIChatCompletionBotConfig extends BotConfigInternal {
  type: 'OPENAI_CHAT_COMPLETION';
  configuration: OpenAIChatCompletionConfig;
}

export interface OpenAIChatCompletionConfig {
    model: string;
    messages: Array<{
      role: "system" | "user" | "assistant";
      content: string;
      name?: string;
    }>;
    temperature?: number | null;
    top_p?: number | null;
    n?: number | null;
    stream?: boolean | null;
    stop?: Array<string> | string;
    max_tokens?: number;
    presence_penalty?: number | null;
    frequency_penalty?: number | null;
    logit_bias?: object | null;
    user?: string;
  }