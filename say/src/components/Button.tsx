import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconDefinition} from "@fortawesome/fontawesome-common-types";


interface ButtonProps {
	text: string;
	type?: "submit";
	disabled?: boolean;
	onClick?: () => void;
	icon?: IconDefinition;

}

const Button: React.FC<ButtonProps> = ({ text, onClick, type, disabled, icon }) => {
	return (
		<button
			className={`mt-auto py-2 text-white rounded shadow-md px-6 py-3 font-semibold text-2xl ${
				disabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
			}`}
			onClick={onClick}
			type={type}
			disabled={disabled}
		>
			{icon && <FontAwesomeIcon icon={icon} className="mr-2 mb-1" size="xl" />}
			<span className="font-semibold text-2xl">{text}</span>
		</button>
	);
};


export default Button;
