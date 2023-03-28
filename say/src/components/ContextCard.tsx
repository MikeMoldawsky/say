import React from 'react';

export interface Context {
	id: string;
}

interface ContextCardProps {
	context: Context;
}

const ContextCard: React.FC<ContextCardProps> = ({ context}) => {
	return (
		<></>
	);
};

export default ContextCard;
