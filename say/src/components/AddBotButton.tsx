import React from 'react';
import Link from 'next/link';

const AddBotButton: React.FC = () => {
	return (
		<Link href="/configure-bot">
			<button className="bg-purple-500 text-white px-6 py-2 rounded-md mt-4">Add Bot</button>
		</Link>
	);
};

export default AddBotButton;
