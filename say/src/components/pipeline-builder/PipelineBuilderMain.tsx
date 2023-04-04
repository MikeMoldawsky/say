import React, {useState} from 'react';
import PipelineBots, {PipelineBot} from '../../components/pipeline-builder/PipelineBots';
import PipelineInputs from "../../components/pipeline-builder/PipelineInputs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowRight, faPlus, faRedo} from '@fortawesome/free-solid-svg-icons';
import PipelineCard from "../../components/pipeline-builder/PipelineCard";
import Button from "../../components/Button";
import SelectBotModal from "../../components/common/SelectBotModal";
import {Bot} from "../../objects-api/bots";
import PipelineOutputs from "../../components/pipeline-builder/PipelineOutputs";
import {toast} from "react-toastify";


const PipelineBuilderMain: React.FC = () => {
	const [pipelineBots, setPipelineBots] = useState<PipelineBot[]>([]);
	const [replaceBotIndex, setReplaceBotIndex] = useState<number | null>(null);
	const [isOpenBotModal, setIsOpenBotModal] = useState(false);
	const [userInput, setUserInput] = useState<string>('');
	const [pipelineInput, setPipelineInput] = useState<string | null>(null);

	const startPipeline = () => {
		setPipelineInput(userInput);
		toast.success("Pipeline started");
	};

	const addOrReplaceBot = (bot: Bot) => {
		if (replaceBotIndex !== null) {
			setPipelineBots(prevPipelineBot => {
				const newPipelineBot = [...prevPipelineBot];
				newPipelineBot[replaceBotIndex] = { bot, answer: null, isOutputBot: newPipelineBot[replaceBotIndex].isOutputBot };
				return newPipelineBot;
			});
			setReplaceBotIndex(null);
			toast.success("Bot replaced");
		} else {
			setPipelineBots([...pipelineBots, { bot, answer: null, isOutputBot: true }]);
			toast.success("Bot added");
		}
	};


	const replaceBot = (index: number) => {
		setReplaceBotIndex(index);
		setIsOpenBotModal(true);
	};

	const deleteBot = (index: number) => {
		setPipelineBots((prevPipelineBot) => {
			const newPipelineBot = prevPipelineBot.filter((_, i) => i !== index);
			if (newPipelineBot.length > 0 && index === prevPipelineBot.length - 1) {
				// If the deleted bot was the last element, set the new last element's isOutputBot to true
				newPipelineBot[newPipelineBot.length - 1].isOutputBot = true;
			}
			return newPipelineBot;
		});
		toast.success("Bot deleted");
	};

	const onUpdate = (botIndex: number, pipelineBot: PipelineBot) => {
		setPipelineBots((prevBotAnswers: PipelineBot[]) => {
			const newBotAnswers = [...prevBotAnswers];
			newBotAnswers[botIndex] = pipelineBot;
			return newBotAnswers;
		});
	};

	return (
		<div className="flex flex-row items-stretch justify-center w-full h-full mb-8">
				<div className="w-1/6 ml-8">
					<PipelineCard title="Input">
						<PipelineInputs
							userInput={userInput}
							setUserInput={setUserInput}
						/>
						<Button
							disabled={pipelineBots.length === 0 || userInput === ''}
							text={"Generate"}
							onClick={startPipeline}
							icon={faRedo}
						/>
					</PipelineCard>
				</div>
				<div className="flex items-center">
					<FontAwesomeIcon icon={faArrowRight} className="mx-4" size="2x" />
				</div>
				<div className="w-3/6">
					<PipelineCard title="Pipeline">
						<PipelineBots input={pipelineInput} pipelineBots={pipelineBots} onUpdate={onUpdate} onDelete={deleteBot} onReplace={replaceBot}/>
						<Button text={"Add Step"} icon={faPlus} onClick={() => setIsOpenBotModal(true)}/>
					</PipelineCard>
					{isOpenBotModal &&
					<SelectBotModal
						prevSelectedBot={replaceBotIndex !== null ? pipelineBots[replaceBotIndex].bot : null}
						setSelectedBot={addOrReplaceBot}
						onClose={() => setIsOpenBotModal(false)}
						buttonText={replaceBotIndex !== null ? "Change" : "Add"}/>}
				</div>
				<div className="flex items-center">
					<FontAwesomeIcon icon={faArrowRight} className="mx-4" size="2x"/>
				</div>
				<div className="w-2/6 mr-8">
					<PipelineCard title="Outputs">
						{
							pipelineBots.length > 0
								? <PipelineOutputs outputPipelineBots={pipelineBots} />
								: null
						}
					</PipelineCard>
				</div>
			</div>
	);
};

export default PipelineBuilderMain;

