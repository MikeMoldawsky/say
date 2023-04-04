import React, {useState} from 'react';
import PipelineBots from '../components/product/PipelineBots';
import PipelineInputs from "../components/product/PipelineInputs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowRight, faPlus, faRedo} from '@fortawesome/free-solid-svg-icons';
import ProductCard from "../components/product/ProductCard";
import Button from "../components/Button";
import SelectBotModal from "../components/common/SelectBotModal";
import {Bot} from "../objects-api/bots";
import PipelineOutputs from "../components/product/PipelineOutputs";


const Product: React.FC = () => {
	const [bots, setBots] = useState<Bot[]>([]);;
	const [replaceBotIndex, setReplaceBotIndex] = useState<number | null>(null);
	const [isOpenBotModal, setIsOpenBotModal] = useState<>(false);
	const [userInput, setUserInput] = useState<string>('');
	const [pipelineInput, setPipelineInput] = useState<string | null>(null);
	const [pipelineOutput, setPipelineOutput] = useState<string | null>(null);

	const startPipeline = () => {
		setPipelineInput(userInput);
	};

	const addOrReplaceBot = (bot: Bot) => {
		if (replaceBotIndex !== null) {
			setBots(prevBots => {
				const newBots = [...prevBots];
				newBots[replaceBotIndex] = bot;
				return newBots;
			});
			setReplaceBotIndex(null);
		} else {
			setBots([...bots, bot]);
		}
	};

	const replaceBot = (index: number) => {
		setReplaceBotIndex(index);
		setIsOpenBotModal(true);
	};


	const deleteBot = (index: number) => {
		setBots(prevBots => prevBots.filter((_, i) => i !== index));
	};

	return (
		<div className="flex flex-col items-center w-full h-full">
			<h1 className="text-3xl mb-8">Product</h1>
			<div className="flex flex-row items-stretch justify-center w-full h-full mb-8">
				<div className="w-1/6 ml-8">
					<ProductCard title="Input">
						<PipelineInputs
							userInput={userInput}
							setUserInput={setUserInput}
							onStartPipeline={setPipelineInput}
						/>
						<Button
							disabled={bots.length === 0 || userInput === ''}
							text={"Generate"}
							onClick={startPipeline}
							icon={faRedo}
						/>
					</ProductCard>
				</div>
				<div className="flex items-center">
					<FontAwesomeIcon icon={faArrowRight} className="mx-4" size="2x" />
				</div>
				<div className="w-3/6">
					<ProductCard title="Pipeline">
						<PipelineBots input={pipelineInput} bots={bots} setPipelineOutput={setPipelineOutput} onDelete={deleteBot} onReplace={replaceBot}/>
						<Button text={"Add Step"} icon={faPlus} onClick={() => setIsOpenBotModal(true)}/>
					</ProductCard>
					{isOpenBotModal &&
						<SelectBotModal
							prevSelectedBot={replaceBotIndex !== null ? bots[replaceBotIndex]: null}
							setSelectedBot={addOrReplaceBot}
						    onClose={() => setIsOpenBotModal(false)}
						    buttonText={replaceBotIndex !== null ? "Change" : "Add"}/>}
				</div>
				<div className="flex items-center">
					<FontAwesomeIcon icon={faArrowRight} className="mx-4" size="2x"/>
				</div>
				<div className="w-2/6 mr-8">
					<ProductCard title="Outputs">
						{
							bots.length > 0
								? <PipelineOutputs outputBot={bots[bots.length - 1]} productOutput={pipelineOutput} />
								: null
						}
					</ProductCard>
				</div>
			</div>
		</div>
	);
};

export default Product;
