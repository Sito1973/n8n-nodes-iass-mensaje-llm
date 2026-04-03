import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class LlmApiCredentials implements ICredentialType {
	name = 'llmApiCredentials';
	displayName = 'LLM API Credentials';
	documentationUrl = '';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description: 'API Key del servicio LLM (Claude, OpenAI, etc.)',
		},
		{
			displayName: 'URL Base del Servicio',
			name: 'baseUrl',
			type: 'string',
			default: '',
			placeholder: 'https://tu-servicio.replit.app',
			description: 'URL base del endpoint LLM',
		},
	];
}
