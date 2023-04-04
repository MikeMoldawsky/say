import React from "react";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import Button from "../Button";

interface TextOutputProps {
	output: string | null;
}

const TextOutput: React.FC<TextOutputProps> = ({ output }) => {
	const copyToClipboard = async () => {
		if (output) {
			try {
				await navigator.clipboard.writeText(output);
				toast.success("Text copied to clipboard");
			} catch (err) {
				console.error("Failed to copy text: ", err);
				toast.error("Failed to copy text");
			}
		}
	};

	return (
		<>
			<div className="flex-grow relative">
				<div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
					{output &&
						<>
						<div className={"text-4xl"}>{output}</div>
						</>
					}
				</div>
			</div>
			<Button disabled={!output} text={"Copy"} onClick={copyToClipboard} icon={faCopy}/>
		</>
	);
};

export default TextOutput;
