import React from 'react';
import Link from 'next/link';

const AddBotButton :  React.FC = () => {
	return (
		<Link href="/configure-bot">
				<button>Add Bot</button>
		</Link>
	);
};

export default AddBotButton;
