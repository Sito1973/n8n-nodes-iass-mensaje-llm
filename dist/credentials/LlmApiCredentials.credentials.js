"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LlmApiCredentials = void 0;
class LlmApiCredentials {
    constructor() {
        this.name = 'llmApiCredentials';
        this.displayName = 'LLM API Credentials';
        this.documentationUrl = '';
        this.properties = [
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
}
exports.LlmApiCredentials = LlmApiCredentials;
//# sourceMappingURL=LlmApiCredentials.credentials.js.map