import React from 'react';
import {faRedo} from "@fortawesome/free-solid-svg-icons";
import Button from "../Button";

interface ProductTextProps {
	userInput: string;
	setUserInput: (input: string) => void;
	handleGenerate: (input: string) => void;
}

const ProductTextInput: React.FC<ProductTextProps> = ({userInput, setUserInput, handleGenerate,}) => {
	const onUserInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setUserInput(e.target.value);
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		handleGenerate(userInput);
	};

	return (
		<>
			<form onSubmit={handleSubmit} className="flex flex-col h-full justify-between">
				<textarea
					className="p-2 border border-gray-300 rounded resize-none max-h-1/2 flex-grow mb-4"
					value={userInput}
					onChange={onUserInputChange}
					rows={1}
					maxLength={1000}
					wrap="soft"
				/>
				<Button text={"Generate"} type="submit" icon={faRedo}/>
			</form>
		</>
	);
};


export default ProductTextInput;
