import React, { useState } from 'react';
import axios from 'axios';

function ChatGPTDemo() {
    const [prompt, setPrompt] = useState('');
    const [completion, setCompletion] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await axios.post('/api/completions', { prompt });
            setCompletion(response.data.completion);
        } catch (error) {
            console.error('Error fetching completion:', error);
        }
    };

    return (
        <div>
            <h1>ChatGPT Demo</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Prompt:
                    <input
                        type="text"
                        value={prompt}
                        onChange={(event) => setPrompt(event.target.value)}
                    />
                </label>
                <button type="submit">Get Completion</button>
            </form>
            <p>Completion: {completion}</p>
        </div>
    );
}

export default ChatGPTDemo;
