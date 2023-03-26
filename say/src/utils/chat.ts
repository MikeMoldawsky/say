export class Chat {
	async sendMessage(message: string): Promise<string> {
		// Implement your chat logic here
		// For now, we will simply echo the message back to the user
		return `You said: ${message}`;
	}
}