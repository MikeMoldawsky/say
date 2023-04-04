import React from "react";
import ImageOutput from "./ImageOutput";
import TextOutput from "./TextOutput";
import {Bot} from "../../objects-api/bots";

interface PipelineOutputsProps {
	outputBots: Bot[];
	outputAnswers: Array<string | null>;
}

const PipelineOutputs: React.FC<PipelineOutputsProps> = ({ outputBots, outputAnswers }) => {
	return (
		<>
			{outputBots.map((bot, index) => {
				const outputAnswer = outputAnswers[index];
				return bot.config.type === "image" ? (
					<ImageOutput key={index} productOutput={outputAnswer} />
				) : (
					<TextOutput key={index} output={outputAnswer} />
				);
			})}
		</>
	);
};

export default PipelineOutputs;
