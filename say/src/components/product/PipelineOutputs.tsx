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
				return (
					<div key={index} className="w-px-512 mb-8 border border-gray-300 p-4 shadow-sm">
						{bot.config.type === "image" ? (
							<ImageOutput productOutput={outputAnswer} />
						) : (
							<TextOutput output={outputAnswer} />
						)}
					</div>
				);
			})}
		</>
	);
};

export default PipelineOutputs;
