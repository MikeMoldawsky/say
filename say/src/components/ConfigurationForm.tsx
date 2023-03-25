import React from 'react';

const ConfigurationForm = () => {
	return (
		<form>
			<label htmlFor="botName">Bot Name:</label>
			<input type="text" id="botName" name="botName" />

			<label htmlFor="botBehavior">Bot Behavior:</label>
			<select id="botBehavior" name="botBehavior">
				<option value="happy">Happy</option>
				<option value="sad">Sad</option>
				<option value="mad">Mad</option>
			</select>

			<button type="submit">Save Configuration</button>
		</form>
	);
};

export default ConfigurationForm;
