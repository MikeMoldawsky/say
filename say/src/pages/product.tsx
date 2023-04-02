import React, { useState } from 'react';
import ProductBots from '../components/product/ProductBots';
import { useUserBotsContext } from '../components/react-context/UserBotsContext';
import Loader from '../components/Loader';

const motivationalSpeakerId = '642902c79e50d4fd10a60ef4';
const stableDiffusionPromptGeneratorId = '642903049e50d4fd10a60ef5';
const stableDiffusionImageGeneratorId = '642873f53e2049ac6bc56b63';

const Product: React.FC = () => {
	const { bots } = useUserBotsContext();
	const [productInput, setProductInput] = useState('');
	const [userInput, setUserInput] = useState('');

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

	const handleGenerate = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!userInput) return;
		setProductInput(userInput);
	};

	return (
		<div className="flex flex-col items-center">
			<h1 className="text-3xl mb-8">Product</h1>
			<div className="w-full max-w-md">
				<form onSubmit={handleGenerate}>
					<input
						className="w-full p-2 border border-gray-300 rounded"
						type="text"
						value={userInput}
						onChange={(e) => {
							setUserInput(e.target.value);
						}}
					/>
					<button
						type="submit"
						className="w-full py-2 mt-4 text-white bg-blue-500 hover:bg-blue-600 rounded"
					>
						Generate
					</button>
				</form>
			</div>
			<ProductBots
				className="mt-8"
				sentenceGenerator={motivationalSpeaker}
				promptGenerator={stableDiffusionPromptGenerator}
				imageGenerator={stableDiffusionImageGenerator}
				input={productInput}
			/>
		</div>
	);
};

export default Product;
