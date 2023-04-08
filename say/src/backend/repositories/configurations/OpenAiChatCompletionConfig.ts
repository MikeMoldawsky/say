import { Type } from "class-transformer";
import {
  ArrayNotEmpty,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";

enum ChatCompletionRequestMessageRoleEnum {
  System = "system",
  User = "user",
  Assistant = "assistant",
}

class ChatCompletionRequestMessage {
//   @IsEnum(ChatCompletionRequestMessageRoleEnum)
//   role!: "system" | "user" | "assistant";

//   @IsString()
//   content!: string;

//   @IsOptional()
//   @IsString()
//   name?: string;
// }

// export class OpenAiChatCompletionConfig {
//   @IsString()
//   model!: string;

//   @ArrayNotEmpty()
//   @ValidateNested({ each: true })
//   @Type(() => ChatCompletionRequestMessage)
//   messages!: ChatCompletionRequestMessage[];

//   @IsOptional()
//   @IsNumber()
//   temperature?: number | null;

//   @IsOptional()
//   @IsNumber()
//   top_p?: number | null;

//   @IsOptional()
//   @IsNumber()
//   n?: number | null;

//   @IsOptional()
//   @IsBoolean()
//   stream?: boolean | null;

//   @IsOptional()
//   @IsString({ each: true })
//   stop?: Array<string> | string;

//   @IsOptional()
//   @IsNumber()
//   max_tokens?: number;

//   @IsOptional()
//   @IsNumber()
//   presence_penalty?: number | null;

//   @IsOptional()
//   @IsNumber()
//   frequency_penalty?: number | null;

//   @IsOptional()
//   logit_bias?: object | null;

//   @IsOptional()
//   @IsString()
//   user?: string;
}
