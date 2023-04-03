import React from "react";
import ImageOutput from "./ImageOutput";
import TextOutput from "./TextOutput";
import {Bot} from "../../objects-api/bots";

interface PipelineOutputsProps {
	outputBot: Bot;
	productOutput: string | null;
}

const PipelineOutputs: React.FC<PipelineOutputsProps> = ({ outputBot, productOutput }) => {

	return (
		<>
			{
			outputBot.config.type === "image" ?
				<ImageOutput productOutput={productOutput}/> :
				<TextOutput output={productOutput}/>
			}
		</>
	);
};

export default PipelineOutputs;
