import React from 'react';
import PipelineBotCard from "./PipelineBotCard";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown} from "@fortawesome/free-solid-svg-icons";
import {BotResult} from "../../objects-api/bots";


export interface PipelineBot {
	bot: BotResult;
	answer: string | null;
	isOutputBot: boolean;
}

interface PipelineBotsProps {
	input: string | null;
	pipelineBots: PipelineBot[];
	onDelete: (index: number) => void;
	onReplace: (index: number) => void;
	onUpdate: (index: number, pipelineBot: PipelineBot) => void;
}

const PipelineBots: React.FC<PipelineBotsProps> = ({input, pipelineBots, onDelete, onReplace, onUpdate}) => {
	return (
		<>
			{
				pipelineBots.map((pipelineBot, botIndex) => {
					return (
						<React.Fragment key={botIndex}>
							<div className="w-full mb-2">
								<PipelineBotCard
									pipelineBot={pipelineBot}
									input={botIndex === 0 ? input : pipelineBots[botIndex - 1].answer}
									onDelete={() => onDelete(botIndex)}
									onReplace={() => onReplace(botIndex)}
									onUpdate={(pipelineBot: PipelineBot) => onUpdate(botIndex, pipelineBot)}
									isLastBot={(pipelineBots.length - 1) === botIndex}
								/>
							</div>
							{botIndex < pipelineBots.length - 1 && (
								<div className="flex justify-center">
									<FontAwesomeIcon icon={faArrowDown} className="mx-4" size="lg"/>
								</div>
							)}
						</React.Fragment>
				);
			})}
		</>
	);
};

export default PipelineBots;
