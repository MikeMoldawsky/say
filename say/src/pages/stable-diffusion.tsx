import Header from '../components/Header';
import { useState, useEffect } from 'react';
import {
    buildGenerationRequest,
    executeGenerationRequest,
    onGenerationComplete,
    GenerationServiceClient,
} from '../frontend/clients/stable-diffusion/helpers';

import { grpc as GRPCWeb } from '@improbable-eng/grpc-web';


const StableDiffusionPage: React.FC = () => {
    const [generatedImageUrl, setGeneratedImageUrl] = useState('');

    useEffect(() => {
        async function generateImage() {
            const generationClient = new GenerationServiceClient('<Stability_AI_Service_URL>');

            const request = buildGenerationRequest('<Engine_ID>', {
                type: 'text-to-image',
                prompts: [{ text: '<Your_Text_Prompt>' }],
            });

            const metadata = {
                'x-api-key': '<Your_API_Key>',
            };

            const response = await executeGenerationRequest(generationClient, request, metadata);

            if (response instanceof Error) {
                console.error('Generation failed', response);
                return;
            }

            const imageArtifacts = response.imageArtifacts;
            if (imageArtifacts.length > 0) {
                const artifact = imageArtifacts[0];
                const base64Image = artifact.getBinary_asB64();
                const imageUrl = 'data:image/png;base64,' + base64Image;
                setGeneratedImageUrl(imageUrl);
            }
        }

        generateImage();
    }, []);

    return (
        <div>
            <h1>Generated Image</h1>
            {generatedImageUrl && <img src={generatedImageUrl} alt="Generated" />}
        </div>
    );
};


export default StableDiffusionPage;

