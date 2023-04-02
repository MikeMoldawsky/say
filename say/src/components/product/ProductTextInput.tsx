import React from 'react';

interface ProductTextProps {
	userInput: string;
	setUserInput: (input: string) => void;
	handleGenerate: (input: string) => void;
}

const ProductTextInput: React.FC<ProductTextProps> = ({userInput, setUserInput, handleGenerate,}) => {
	const onUserInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserInput(e.target.value);
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		handleGenerate(userInput);
	};

	return (
		<div className="border border-gray-300 bg-white shadow-sm rounded p-4 h-full flex flex-col">
			<h2 className="text-2xl mb-4">Input</h2>
			<form onSubmit={handleSubmit} className="flex flex-col h-full justify-between">
				<textarea
					className="p-2 border border-gray-300 rounded resize-none max-h-1/2 flex-grow"
					value={userInput}
					onChange={onUserInputChange}
					rows={1}
					maxLength={1000}
					wrap="soft"
				/>
				<button
					type="submit"
					className="mt-8 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded"
				>
					Generate
				</button>
			</form>
		</div>
	);
};

export default ProductTextInput;
