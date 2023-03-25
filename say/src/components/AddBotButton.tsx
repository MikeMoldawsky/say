import React from 'react';
import Link from 'next/link';

const AddBotButton = () => {
	return (
		<Link href="/configure-bot">
			<button as="a">Add Bot</button>
		</Link>
	);
};

export default AddBotButton;
