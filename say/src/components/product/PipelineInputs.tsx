import React from 'react';
import {faRedo} from "@fortawesome/free-solid-svg-icons";
import Button from "../Button";

interface PipelineInputsProps {
	userInput: string;
	setUserInput: (input: string) => void;
	onStartPipeline: (input: string) => void;
}

const PipelineInputs: React.FC<PipelineInputsProps> = ({userInput, setUserInput, onStartPipeline,}) => {
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onStartPipeline(userInput);
	};

	return (
		<>
			<form onSubmit={handleSubmit} className="flex flex-col h-full justify-between">
				<textarea
					className="p-2 border border-gray-300 rounded resize-none max-h-1/2 flex-grow mb-4"
					value={userInput}
					onChange={(e) => setUserInput(e.target.value)}
					rows={1}
					maxLength={1000}
					wrap="soft"
				/>
				<Button disabled={userInput === ''} text={"Generate"} type="submit" icon={faRedo}/>
			</form>
		</>
	);
};


export default PipelineInputs;
