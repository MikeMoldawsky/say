import React, {useState} from 'react';
import PipelineBots from '../components/product/PipelineBots';
import { useUserBotsContext } from '../components/react-context/UserBotsContext';
import Loader from '../components/Loader';
import ProductImageOutput from "../components/product/ProductImageOutput";
import PipelineInputs from "../components/product/PipelineInputs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowRight, faPlus} from '@fortawesome/free-solid-svg-icons';
import ProductCard from "../components/product/ProductCard";
import Button from "../components/Button";
import SelectBotModal from "../components/common/SelectBotModal";
import {Bot} from "../objects-api/bots";


const Product: React.FC = () => {
	const [bots, setBots] = useState<Bot[]>([]);;
	const [isOpenBotModal, setIsOpenBotModal] = useState<>(false);
	const [userInput, setUserInput] = useState<string>('');
	const [productInput, setProductInput] = useState<string | null>(null);
	const [productOutput, setProductOutput] = useState<string | null>(null);

	const addBot = (bot: Bot) => {
		setBots([...bots, bot]);
	}

	return (
		<div className="flex flex-col items-center w-full h-full">
			<h1 className="text-3xl mb-8">Product</h1>
			<div className="flex flex-row items-stretch justify-center w-full h-full mb-8">
				<div className="w-1/6 ml-8">
					<ProductCard title="Inputs">
						<PipelineInputs
							userInput={userInput}
							setUserInput={setUserInput}
							handleGenerate={setProductInput}
						/>
					</ProductCard>
				</div>
				<div className="flex items-center">
					<FontAwesomeIcon icon={faArrowRight} className="mx-4" size="2x" />
				</div>
				<div className="w-3/6">
					<ProductCard title="Pipeline">
						<PipelineBots input={productInput} bots={bots} setPipelineOutput={setProductOutput} />
						<Button text={"Add Step"} icon={faPlus} onClick={() => setIsOpenBotModal(true)}/>
					</ProductCard>
					{isOpenBotModal && <SelectBotModal setSelectedBot={addBot}  onClose={() => setIsOpenBotModal(false)} buttonText={"Add"}/>}
				</div>
				<div className="flex items-center">
					<FontAwesomeIcon icon={faArrowRight} className="mx-4" size="2x"/>
				</div>
				<div className="w-2/6 mr-8">
					<ProductCard title="Outputs">
						<ProductImageOutput productOutput={productOutput} />
					</ProductCard>
				</div>
			</div>
		</div>
	);
};

export default Product;
