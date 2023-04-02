import React, {useState} from 'react';
import ProductBotPipeLine from '../components/product/ProductBotPipeLine';
import { useUserBotsContext } from '../components/react-context/UserBotsContext';
import Loader from '../components/Loader';
import ProductImageOutput from "../components/product/ProductImageOutput";
import ProductTextInput from "../components/product/ProductTextInput";

const motivationalSpeakerId = '642902c79e50d4fd10a60ef4';
const stableDiffusionPromptGeneratorId = '642903049e50d4fd10a60ef5';
const stableDiffusionImageGeneratorId = '642873f53e2049ac6bc56b63';

const Product: React.FC = () => {
	const { bots } = useUserBotsContext();
	const [userInput, setUserInput] = useState<string>('');
	const [productInput, setProductInput] = useState<string | null>(null);
	const [productOutput, setProductOutput] = useState<string | null>(null);

	if (bots === null) {
		return <Loader />;
	}

	const motivationalSpeaker = bots.find(
		(bot) => bot._id === motivationalSpeakerId,
	);
	const stableDiffusionPromptGenerator = bots.find(
		(bot) => bot._id === stableDiffusionPromptGeneratorId,
	);
	const stableDiffusionImageGenerator = bots.find(
		(bot) => bot._id === stableDiffusionImageGeneratorId,
	);

	return (
		<div className="flex flex-col items-center w-full h-full">
			<h1 className="text-3xl mb-8">Product</h1>
			<div className="flex flex-row items-stretch justify-center w-full h-full mb-8">
				<div className="w-1/6 ml-8 flex items-center">
						<ProductTextInput
							userInput={userInput}
							setUserInput={setUserInput}
							handleGenerate={setProductInput}
						/>
				</div>
				<div className="w-3/6">
					<ProductBotPipeLine
						sentenceGenerator={motivationalSpeaker}
						promptGenerator={stableDiffusionPromptGenerator}
						imageGenerator={stableDiffusionImageGenerator}
						input={productInput}
						setProductOutput={setProductOutput}
					/>
				</div>
				<div className="w-2/6 mr-8">
					<ProductImageOutput productOutput={productOutput} />
				</div>
			</div>
		</div>
	);

};

export default Product;
