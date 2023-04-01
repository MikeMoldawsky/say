import React from "react";
import GenerateImageWindow from "../components/image/GenerateImageWindow";

const ImagePage: React.FC = () => {
    // TODO: add if botId is null, redirect to index page
    return (
        <div>
            <GenerateImageWindow />
        </div>
    );
};

export default ImagePage;
