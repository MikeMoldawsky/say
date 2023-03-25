const inputText = document.getElementById('input-text');
const sendBtn = document.getElementById('send-btn');
const responseDiv = document.getElementById('response');

sendBtn.addEventListener('click', () => {
	const text = inputText.value.trim();

	if (text) {
		chrome.runtime.sendMessage(
			{ type: 'send_to_chatgpt', text: text },
			(response) => {
				if (response.error) {
					responseDiv.innerHTML = `<span class="error">Error: ${response.error}</span>`;
				} else {
					responseDiv.innerHTML = `<span class="success">${response.result}</span>`;
				}
			}
		);
	} else {
		responseDiv.innerHTML = '<span class="error">Please enter some text.</span>';
	}
});
