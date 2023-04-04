import React from 'react';
import PipelineBuilderMain from "../components/product/PipelineBuilderMain";



const PipelineBuilder: React.FC = () => {
	return (
		<div className="flex flex-col items-center w-full h-full">
			<h1 className="text-3xl mb-8">Pipeline Builder</h1>
			<PipelineBuilderMain/>
		</div>
	);
};

export default PipelineBuilder;

