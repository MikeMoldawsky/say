import React, { useState, useEffect } from "react";
import {DiffusionSampler} from "../frontend/clients/stable-diffusion/generation/generation_pb";
import { client, metadata } from "../frontend/clients/stable-diffusion/stableDiffusionClient";
import { buildGenerationRequest, executeGenerationRequest } from "../frontend/clients/stable-diffusion/helpers";

const GenerateImage: React.FC = () => {
    const [imageBase64, setImageBase64] = useState<string | null>(null);

    useEffect(() => {
        async function fetchImage() {
            const request = buildGenerationRequest("stable-diffusion-512-v2-1", {
                type: "text-to-image",
                prompts: [
                    {
                        text: "A dream of a distant galaxy, by Caspar David Friedrich, matte painting trending on artstation HQ",
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
        }

        fetchImage();
    }, []);

    return (
        <div>
            <h1>Generated Image</h1>
            <div>
                {imageBase64 ? (
                    <img src={imageBase64} alt="Generated Image" />
                ) : (
                    <p>Loading image...</p>
                )}
            </div>
        </div>
    );
};

export default GenerateImage;
