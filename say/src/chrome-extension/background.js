// Add your API key here
const apiKey = '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';


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.type === 'send_to_chatgpt') {
		fetch('https://api.openai.com/v1/completions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${apiKey}`,
			},
			body: JSON.stringify({
				model: "text-davinci-003",
				prompt: request.text,
				max_tokens: 50,
				n: 1,
				stop: null,
				temperature: 0.5,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.choices && data.choices.length > 0) {
					sendResponse({ result: data.choices[0].text });
				} else {
					console.error('Error: No choices returned in the response');
					sendResponse({ error: 'No choices returned in the response' });
				}
			})
			.catch((error) => {
				console.error('Error:', error);
				sendResponse({ error: error.message });
			});

		return true;
	}
});


// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
// 	if (request.type === 'send_to_chatgpt') {
// 		fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 				'Authorization': `Bearer ${apiKey}`,
// 			},
// 			body: JSON.stringify({
// 				messages: [
// 					{
// 						role: "system",
// 						content: "You are a helpful assistant."
// 					},
// 					{
// 						role: "user",
// 						content: request.text
// 					}
// 				]
// 			}),
// 		})
// 			.then((response) => response.json())
// 			.then((data) => {
// 				if (data.choices && data.choices.length > 0) {
// 					sendResponse({ result: data.choices[0].text });
// 				} else {
// 					console.error('Error: No choices returned in the response');
// 					sendResponse({ error: 'No choices returned in the response' });
// 				}
// 			})
// 			.catch((error) => {
// 				console.error('Error:', error);
// 				sendResponse({ error: error.message });
// 			});
//
// 		return true;
// 	}
// });

