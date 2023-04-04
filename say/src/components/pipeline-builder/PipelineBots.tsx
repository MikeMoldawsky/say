import React, {useEffect, useState} from 'react';
import PipelineBotCard from "./PipelineBotCard";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown} from "@fortawesome/free-solid-svg-icons";
import {Bot} from "../../objects-api/bots";


export interface PipelineBot {
	bot: Bot;
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
	useEffect(() => {}, [pipelineBots]); // TODO: check if needed

	return (
		<>
			{pipelineBots.map((pipelineBot, botIndex) => {
				return (
					<React.Fragment key={botIndex}>
						<div className="w-full mb-2">
							<PipelineBotCard
								pipelineBot={pipelineBot}
								input={botIndex === 0 ? input : pipelineBots[botIndex - 1].answer}
								onDelete={() => onDelete(botIndex)}
								onReplace={() => onReplace(botIndex)}
								onUpdate={(pipelineBot: PipelineBot) => onUpdate(botIndex, pipelineBot)}
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
