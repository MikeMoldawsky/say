import React, {useRef, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo, faDownload } from "@fortawesome/free-solid-svg-icons";
import {DiffusionSampler} from "../frontend/clients/stable-diffusion/generation/generation_pb";
import { client, metadata } from "../frontend/clients/stable-diffusion/stableDiffusionClient";
import { buildGenerationRequest, executeGenerationRequest } from "../frontend/clients/stable-diffusion/helpers";
import Loader from "../components/Loader";

const GenerateImage: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [imageBase64, setImageBase64] = useState<string | null>(null);
    const [userPrompt, setUserPrompt] = useState<string>(
        "A dream of a distant galaxy, by Caspar David Friedrich, matte painting trending on artstation HQ"
    );

    const imageRef = useRef<HTMLImageElement | null>(null);

    const downloadImage = () => {
        const src = imageRef.current?.src ?? null;
        if (src) {
            const link = document.createElement("a");
            link.href = src;
            link.download = "generated-image.png";
            link.click();
        }
    };

    async function fetchImage() {
        setIsLoading(true);
        const request = buildGenerationRequest("stable-diffusion-512-v2-1", {
            type: "text-to-image",
            prompts: [
                {
                    text: userPrompt,
                },
            ],
            width: 512,
            height: 512,
            samples: 1,
            cfgScale: 13,
            steps: 25,
            sampler: DiffusionSampler.SAMPLER_K_DPMPP_2M,
        });

        try {
            const response = await executeGenerationRequest(client, request, metadata);
            if (response instanceof Error) {
                console.error("Generation failed", response);
                throw response;
            } else {
                const imageArtifact = response.imageArtifacts[0];
                setImageBase64(`data:image/png;base64,${imageArtifact.getBinary_asB64()}`);
            }
        } catch (error) {
            console.error("Failed to generate image", error);
        }
        setIsLoading(false);
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="kuku0 bg-white p-8 rounded-lg shadow-md w-full max-w-7xl h-[90vh] flex flex-col w-full h-full">
                <h1 className="text-4xl font-bold mb-4">Image Generator</h1>
                <div className="flex flex-grow">
                    <div className="kuku1 w-1/3 pr-8 flex flex-col space-y-4">
                        <div className="w-full h-full">
                             <textarea
                                 id="prompt"
                                 value={userPrompt}
                                 onChange={(e) => setUserPrompt(e.target.value)}
                                 className="mt-1 block w-full h-[60vh] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
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
                    <div className="kuku2 relative w-2/3 border-gray-300 pl-8">
                        <div className="absolute top-0 left-0 w-full h-[calc(100%-52px)]">
                            <div className="border h-full flex items-center justify-center">
                                {
                                    isLoading ?
                                    <Loader /> :
                                    <img src={imageBase64} alt="Generated Image" className="max-h-full max-w-full" />
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
