import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconDefinition} from "@fortawesome/fontawesome-common-types";


interface ButtonProps {
	text: string;
	type?: "submit";
	onClick?: () => void;
	icon: IconDefinition;

}

const Button: React.FC<ButtonProps> = ({ text, onClick, type, icon }) => {
	return (
		<button
			className="mt-auto py-2 text-white bg-blue-500 hover:bg-blue-600 rounded shadow-md px-6 py-3"
			onClick={onClick}
			type={type}
		>
			<FontAwesomeIcon icon={icon} className="mr-2 mb-1" size="xl" />
			<span className="font-semibold text-2xl">{text}</span>
		</button>
	);
};


export default Button;
