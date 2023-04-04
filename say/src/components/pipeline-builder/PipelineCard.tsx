import React from 'react';

interface PipelineCardProps {
	title: string;
	children: React.ReactNode;
}

const PipelineCard: React.FC<PipelineCardProps> = ({ title, children }) => {
	return (
		<div className="border border-gray-300 bg-white shadow-sm rounded p-4 h-full flex flex-col">
			<h2 className="text-2xl mb-4">{title}</h2>
			{children}
		</div>
	);
};

export default PipelineCard;
