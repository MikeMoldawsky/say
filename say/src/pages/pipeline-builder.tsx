import React from 'react';
import PipelineBuilderMain from "../components/pipeline-builder/PipelineBuilderMain";
import Button from "../components/Button";



const PipelineBuilder: React.FC = () => {
	return (
		<div className="flex flex-col items-center w-full h-full mb-8">
			<h1 className="text-2xl mt-1 mb-4">Pipeline Builder</h1>
			<div className="w-full max-w-screen-xl">
				<div className="mb-4 flex flex-col">
					<label htmlFor="pipelineName" className="block text-md font-medium text-gray-700">
						Pipeline Name
					</label>
					<div className="flex flex-row w-1/5">
						<input
							type="text"
							name="pipelineName"
							id="pipelineName"
							className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
							placeholder="Enter pipeline name"
						/>
						<div className={"ml-2 self-end"}>
							<Button text={"Publish"}/>
						</div>
					</div>
				</div>
				<div className="bg-white rounded-lg shadow-md p-6">
					<div className="flex flex-row items-stretch justify-center w-full h-full">
						<div className="flex flex-col items-center w-full h-full">
							<PipelineBuilderMain/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PipelineBuilder;

