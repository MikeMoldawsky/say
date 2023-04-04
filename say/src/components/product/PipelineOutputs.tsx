import React from "react";
import PipelineImageOutput from "./PipelineImageOutput";
import PipelineTextOutput from "./PipelineTextOutput";
import {PipelineBot} from "./PipelineBots";

interface PipelineOutputsProps {
	outputPipelineBots: PipelineBot[];
}

const PipelineOutputs: React.FC<PipelineOutputsProps> = ({ outputPipelineBots }) => {
	return (
		<>
			{outputPipelineBots.map((pipelineBot, index) => {
				return (
					<div key={index} className="w-px-512 mb-8 border border-gray-300 p-4 shadow-sm">
						{pipelineBot.bot.config.type === "image" ? (
							<PipelineImageOutput productOutput={pipelineBot.answer} />
						) : (
							<PipelineTextOutput output={pipelineBot.answer} />
						)}
					</div>
				);
			})}
		</>
	);
};

export default PipelineOutputs;
