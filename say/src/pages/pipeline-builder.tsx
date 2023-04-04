import React, {useState} from 'react';
import PipelineBuilderMain from "../components/pipeline-builder/PipelineBuilderMain";
import Button from "../components/Button";
import {PipelineBot} from "../components/pipeline-builder/PipelineBots";



const PipelineBuilder: React.FC = () => {
	const [pipelineBots, setPipelineBots] = useState<PipelineBot[]>([]);

	return (
		<div className="flex flex-col items-center w-full h-full mb-8">
			<h1 className="text-2xl mt-1 mb-4">Pipeline Builder</h1>
			<div className="w-full max-w-screen-xl">
				<div className="mb-4 flex flex-col">
					<div className="flex flex-row w-1/2">
						<div className="w-1/4">
							<label htmlFor="pipelineName" className="block text-md font-medium text-gray-700">
								Pipeline Name
							</label>
							<input
								type="text"
								name="pipelineName"
								id="pipelineName"
								className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
								placeholder="Enter pipeline name"
							/>
						</div>
						<div className="w-2/4 ml-4">
							<label htmlFor="pipelineDescription" className="block text-md font-medium text-gray-700">
								Pipeline Description
							</label>
							<input
								type="text"
								name="pipelineDescription"
								id="pipelineDescription"
								className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
								placeholder="Enter pipeline description"
							/>
						</div>
						<div className={"ml-4 self-end"}>
							<Button text={"Publish"} disabled={true}/>
						</div>
					</div>
				</div>
				<div className="bg-white rounded-lg shadow-md p-6">
					<div className="flex flex-row items-stretch justify-center w-full h-full">
						<div className="flex flex-col items-center w-full h-full">
							<PipelineBuilderMain pipelineBots={pipelineBots} setPipelineBots={setPipelineBots}/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PipelineBuilder;

