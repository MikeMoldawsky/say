import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconDefinition} from "@fortawesome/fontawesome-common-types";


interface ButtonProps {
	text?: string;
	type?: "submit";
	disabled?: boolean;
	onClick?: () => void;
	backgroundColor?: string;
	icon?: IconDefinition;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, type, disabled, icon, backgroundColor }) => {
	const bgColor = backgroundColor ? backgroundColor : "blue";

	return (
		<button
			className={`mt-auto py-2 text-white rounded shadow-md px-6 py-3 font-semibold text-2xl ${
				disabled ? 'bg-gray-300 cursor-not-allowed' : `bg-${bgColor}-500 hover:bg-${bgColor}-700`
			}`}
			onClick={onClick}
			type={type}
			disabled={disabled}
		>
			{icon && <FontAwesomeIcon icon={icon} className="mr-2 mb-1" size="lg" />}
			{text && <span className="font-semibold text-2xl">{text}</span>}
		</button>
	);
};


export default Button;
