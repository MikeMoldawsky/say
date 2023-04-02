import React, {useRef, useState} from 'react';
import ProductBots from '../components/product/ProductBots';
import { useUserBotsContext } from '../components/react-context/UserBotsContext';
import Loader from '../components/Loader';
import Image from "next/image";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload, faImage} from "@fortawesome/free-solid-svg-icons";

const motivationalSpeakerId = '642902c79e50d4fd10a60ef4';
const stableDiffusionPromptGeneratorId = '642903049e50d4fd10a60ef5';
const stableDiffusionImageGeneratorId = '642873f53e2049ac6bc56b63';

const Product: React.FC = () => {
	const { bots } = useUserBotsContext();
	const [userInput, setUserInput] = useState<string>('');
	const [productInput, setProductInput] = useState<string | null>(null);
	const [productOutput, setProductOutput] = useState<string | null>(null);
	const imageRef = useRef<HTMLImageElement | null>(null);


	if (bots === null) {
		return <Loader />;
	}

	const downloadImage = () => {
		console.log("Called downloadImage")
		const src = imageRef.current?.src ?? null;
		if (src) {
			console.log("In src")
			const link = document.createElement("a");
			link.href = src;
			link.download = "generated-image.png";
			link.click();
		}
	};


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
		console.log("handling user input button", userInput);
		event.preventDefault();
		if (!userInput) return;
		setProductInput(userInput);
	};

	function onUserInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		console.log("onUserInputChange", e.target.value);
		setUserInput(e.target.value);
	}

	return (
		<div className="flex flex-col items-center">
			<h1 className="text-3xl mb-8">Product</h1>
			<div className="kuku0 w-full max-w-md">
				<h2 className="text-3xl mb-8">Input</h2>
				<form onSubmit={handleGenerate}>
					<input
						className="w-full p-2 border border-gray-300 rounded"
						type="text"
						value={userInput}
						onChange={onUserInputChange}
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
				className="mt-8 kuku1"
				sentenceGenerator={motivationalSpeaker}
				promptGenerator={stableDiffusionPromptGenerator}
				imageGenerator={stableDiffusionImageGenerator}
				input={productInput}
				setProductOutput={setProductOutput}
			/>
			<div className="kuku2 relative w-64 h-64 border border-gray-300 rounded-lg">
				<div className="absolute top-0 left-0 w-full h-[calc(100%-52px)]">
					<div className="border h-full flex items-center justify-center rounded-lg">
						{
							productOutput ?
								(<Image
										ref={imageRef}
										src={`data:image/png;base64,${productOutput}`}
										alt="Generated Image"
										width={256}
										height={256}
										className="max-h-full max-w-full"
									/>
								) : (
									<FontAwesomeIcon icon={faImage} className="text-gray-300" size="10x" />
								)
						}
					</div>
				</div>
				<button
					className="absolute bottom-0 left-0 w-full px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-b-lg"
					onClick={downloadImage}
				>
					<FontAwesomeIcon icon={faDownload} className="mr-2" />
					Download Image
				</button>
			</div>
		</div>
	);
};

export default Product;
