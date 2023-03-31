import React, {useRef, useState} from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo, faDownload, faImage } from "@fortawesome/free-solid-svg-icons";
import Loader from "../components/Loader";
import {
    GenerateTextToImageRequest,
    GenerateTextToImageResponse
} from "../objects-api/generate-image";
import {generateTextToImage} from "../frontend/clients/generateImageClient";

const GenerateImage: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [imageBase64, setImageBase64] = useState<string | null>(null);
    const [userPrompt, setUserPrompt] = useState<string>(
        "A dream of a distant galaxy, by Caspar David Friedrich, matte painting trending on artstation HQ"
    );

    const imageRef = useRef<HTMLImageElement | null>(null);

    const downloadImage = () => {
        console.log("Called downloadImage")
        const src = imageRef.current?.src ?? null;
        if (src) {
            console.log("In src")
            const link = document.createElement("a");
            link.href = src;
            link.download = "generated-image.png";
            link.click();
        }
    };

    async function fetchImage() {
        setIsLoading(true);
        const request: GenerateTextToImageRequest = {
            prompt: {
                text: userPrompt,
            },
            height: 512,
            width: 512
        }
        try {
            const response: GenerateTextToImageResponse = await generateTextToImage(request);
            setImageBase64(`data:image/png;base64,${response.imageBase64}`);
        } catch (error) {
            console.error("Failed to generate image", error);
        }
        setIsLoading(false);
    }

    return (
        <div className="h-screen bg-gray-100 flex items-center justify-center overflow-auto">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-7xl flex-grow flex flex-col w-full h-full overflow-hidden">
                <h1 className="text-4xl font-bold mb-4">Image Generator</h1>
                <div className="flex flex-grow">
                    <div className="w-1/3 pr-8 flex flex-col space-y-4">
                        <div className="w-full flex-grow flex flex-col">
                       <textarea
                           id="prompt"
                           value={userPrompt}
                           onChange={(e) => setUserPrompt(e.target.value)}
                           className="mt-1 block w-full h-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                       />

                            <div className="flex-grow flex flex-col">
                                <button
                                    onClick={fetchImage}
                                    className="w-full px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded mt-4"
                                >
                                    <FontAwesomeIcon icon={faRedo} className="mr-2" />
                                    Generate Image
                                </button>
                            </div>
                        </div>

                    </div>
                    <div className="relative w-2/3 border-gray-300 pl-8">
                        <div className="absolute top-0 left-0 w-full h-[calc(100%-52px)]">
                            <div className="border h-full flex items-center justify-center rounded-md">
                                {
                                    isLoading ?
                                        <Loader /> :
                                        <Image
                                            ref={imageRef}
                                            src={imageBase64 || undefined}
                                            alt="Generated Image"
                                            width={512}
                                            height={512}
                                            className="max-h-full max-w-full"
                                        />
                                }
                            </div>
                        </div>
                        <button
                            className="absolute bottom-0 left-0 w-full px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded"
                            onClick={downloadImage}
                        >
                            <FontAwesomeIcon icon={faDownload} className="mr-2" />
                            Download Image
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GenerateImage;
