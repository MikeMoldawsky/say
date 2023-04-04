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
		<div className="flex flex-col items-center">
			<div className="w-full h-512 flex items-center justify-center mb-4">
				{output && <div className={"text-4xl"}>{output}</div>}
			</div>
			<Button disabled={!output} text={"Copy"} onClick={copyToClipboard} icon={faCopy} />
		</div>
	);
};


export default TextOutput;
