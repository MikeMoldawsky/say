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
			className={`flex items-center justify-center py-2 px-4 text-white rounded shadow-md font-semibold ${
				disabled ? 'bg-gray-300 cursor-not-allowed' : `bg-${bgColor}-500 hover:bg-${bgColor}-700`
			}`}
			onClick={onClick}
			type={type}
			disabled={disabled}
		>
			{icon && <FontAwesomeIcon icon={icon} size="sm" className={text? "mr-2" : ""}/>}
			{text && <span className="font-semibold text-sm">{text}</span>}
		</button>
	);
};


export default Button;
