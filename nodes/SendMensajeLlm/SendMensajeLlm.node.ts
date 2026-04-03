import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IHttpRequestMethods,
} from 'n8n-workflow';

export class SendMensajeLlm implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Send Mensaje LLM',
		name: 'sendMensajeLlm',
		icon: 'file:sendMensajeLlm.png',
		group: ['output'],
		version: 1,
		subtitle: 'Enviar mensaje al LLM',
		description: 'Envía mensajes al servicio LLM con contexto completo del cliente, pedido y configuración',
		defaults: {
			name: 'Send Mensaje LLM',
		},
		inputs: ['main'] as any,
		outputs: ['main'] as any,
		credentials: [],
		properties: [
			// ═══════════════════════════════════════════
			// CONEXION
			// ═══════════════════════════════════════════
			{
				displayName: 'URL del Servicio',
				name: 'url',
				type: 'string',
				default: '',
				required: true,
				placeholder: 'https://tu-servicio.replit.app/api/message',
				description: 'URL completa del endpoint LLM. Puedes usar expresión: ={{ $("Get row(s)").item.json.url_vb }}',
			},

			// ═══════════════════════════════════════════
			// CONVERSACION
			// ═══════════════════════════════════════════
			{
				displayName: '── Conversación ──',
				name: 'conversacionNotice',
				type: 'notice',
				default: '',
			},
			{
				displayName: 'Thread ID',
				name: 'threadId',
				type: 'string',
				default: '',
				description: 'ID del hilo de conversación en el LLM',
			},
			{
				displayName: 'Mensajes',
				name: 'message',
				type: 'string',
				default: '',
				typeOptions: {
					rows: 4,
				},
				description: 'Mensajes de la conversación. Acepta texto directo con saltos de línea o expresiones.',
			},
			{
				displayName: 'Subscriber ID',
				name: 'subscriberId',
				type: 'string',
				default: '',
				description: 'WhatsApp ID del contacto (wa_id)',
			},
			{
				displayName: 'Previous Response ID',
				name: 'previousResponseId',
				type: 'string',
				default: '',
				description: 'ID de la respuesta anterior del LLM para continuidad',
			},
			{
				displayName: 'Assistant / Prompt',
				name: 'assistant',
				type: 'string',
				default: '',
				description: 'Identificador del prompt o asistente a usar',
			},

			// ═══════════════════════════════════════════
			// DATOS DEL CLIENTE
			// ═══════════════════════════════════════════
			{
				displayName: '── Datos del Cliente ──',
				name: 'clienteNotice',
				type: 'notice',
				default: '',
			},
			{
				displayName: 'Teléfono',
				name: 'telefono',
				type: 'string',
				default: '',
				placeholder: '+573001234567',
				description: 'Número de teléfono del cliente con prefijo +',
			},
			{
				displayName: 'Teléfono Prompt',
				name: 'telefonoPrompt',
				type: 'string',
				default: '',
				placeholder: '+573001234567',
				description: 'Teléfono para incluir en el prompt del LLM',
			},
			{
				displayName: 'Nombre',
				name: 'nombreNull',
				type: 'string',
				default: '',
				description: 'Nombre del cliente (puede ser null si no se conoce)',
			},
			{
				displayName: 'Dirección Cliente',
				name: 'direccionCliente',
				type: 'string',
				default: '',
				description: 'Dirección de entrega del cliente',
			},
			{
				displayName: 'Dirección (Nullable)',
				name: 'direccionNull',
				type: 'string',
				default: '',
				description: 'Dirección alternativa/nullable del cliente',
			},
			{
				displayName: 'Ciudad',
				name: 'ciudadCliente',
				type: 'string',
				default: '',
				description: 'Ciudad del cliente',
			},
			{
				displayName: 'Indicaciones Dirección',
				name: 'indicacionesDireccionNull',
				type: 'string',
				default: '',
				description: 'Indicaciones adicionales para la dirección de entrega',
			},

			// ═══════════════════════════════════════════
			// DATOS DEL PEDIDO
			// ═══════════════════════════════════════════
			{
				displayName: '── Datos del Pedido ──',
				name: 'pedidoNotice',
				type: 'notice',
				default: '',
			},
			{
				displayName: 'Forma de Pago',
				name: 'formaDePagoNull',
				type: 'string',
				default: '',
				description: 'Forma de pago seleccionada por el cliente',
			},
			{
				displayName: 'Estado del Pago',
				name: 'estadoDelPagoNull',
				type: 'string',
				default: '',
				description: 'Estado actual del pago del cliente',
			},
			{
				displayName: 'Valor Domicilio',
				name: 'valorDomicilio',
				type: 'string',
				default: '',
				description: 'Valor del domicilio/envío',
			},
			{
				displayName: 'Hora de Entrega',
				name: 'horaDeEntregaNull',
				type: 'string',
				default: '',
				description: 'Hora programada de entrega',
			},
			{
				displayName: 'Productos Agotados',
				name: 'productosAgotados',
				type: 'string',
				default: '',
				description: 'Lista de productos agotados actualmente',
			},
			{
				displayName: 'Disponibilidad Bowls',
				name: 'disponibilidadBowls',
				type: 'string',
				default: '',
				description: 'Mensaje de disponibilidad de bowls',
			},

			// ═══════════════════════════════════════════
			// CONFIGURACION LLM
			// ═══════════════════════════════════════════
			{
				displayName: '── Configuración LLM ──',
				name: 'llmNotice',
				type: 'notice',
				default: '',
			},
			{
				displayName: 'Model ID',
				name: 'modelId',
				type: 'string',
				default: '',
				description: 'Identificador del modelo LLM a usar',
			},
			{
				displayName: 'LLM ID',
				name: 'llmId',
				type: 'string',
				default: '',
				description: 'ID secundario del modelo LLM',
			},
			{
				displayName: 'Modelo Claude',
				name: 'modelClaude',
				type: 'string',
				default: '',
				placeholder: 'claude-sonnet-4-20250514',
				description: 'Modelo específico de Claude a usar',
			},
			{
				displayName: 'Effort',
				name: 'effort',
				type: 'options',
				options: [
					{ name: 'Low', value: 'low' },
					{ name: 'Medium', value: 'medium' },
					{ name: 'High', value: 'high' },
				],
				default: 'medium',
				description: 'Nivel de esfuerzo del modelo',
			},
			{
				displayName: 'Thinking',
				name: 'thinking',
				type: 'number',
				default: 1,
				description: 'Activar thinking del modelo (1 = activado, 0 = desactivado)',
			},
			{
				displayName: 'Buffer Seconds',
				name: 'bufferSeconds',
				type: 'number',
				default: 0,
				description: 'Segundos de buffer antes de procesar',
			},
			{
				displayName: 'API Key',
				name: 'apiKey',
				type: 'string',
				typeOptions: { password: true },
				default: '',
				description: 'API Key del servicio LLM. Si se deja vacío, el backend usa su key interna.',
			},
			{
				displayName: 'Cache Control',
				name: 'useCacheControl',
				type: 'string',
				default: '',
				description: 'Configuración de control de caché del LLM',
			},

			// ═══════════════════════════════════════════
			// IMAGEN
			// ═══════════════════════════════════════════
			{
				displayName: '── Imagen Adjunta ──',
				name: 'imagenNotice',
				type: 'notice',
				default: '',
			},
			{
				displayName: 'Incluir Imagen',
				name: 'includeImage',
				type: 'boolean',
				default: false,
				description: 'Whether to include a base64 image in the request',
			},
			{
				displayName: 'Campo Base64',
				name: 'imageBase64Field',
				type: 'string',
				default: 'base64',
				displayOptions: {
					show: {
						includeImage: [true],
					},
				},
				description: 'Base64 de la imagen directo (ej: {{ $json.base64 }}) o nombre del campo',
			},
			{
				displayName: 'Media Type',
				name: 'imageMediaType',
				type: 'options',
				options: [
					{ name: 'JPEG', value: 'image/jpeg' },
					{ name: 'PNG', value: 'image/png' },
					{ name: 'WebP', value: 'image/webp' },
					{ name: 'GIF', value: 'image/gif' },
				],
				default: 'image/jpeg',
				displayOptions: {
					show: {
						includeImage: [true],
					},
				},
				description: 'Tipo de imagen',
			},

			// ═══════════════════════════════════════════
			// OPCIONES AVANZADAS
			// ═══════════════════════════════════════════
			// ═══════════════════════════════════════════
			// CAMPOS ADICIONALES
			// ═══════════════════════════════════════════
			{
				displayName: '── Campos Adicionales ──',
				name: 'camposNotice',
				type: 'notice',
				default: '',
			},
			{
				displayName: 'Campos Extra',
				name: 'extraFields',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				placeholder: 'Agregar Campo',
				default: {},
				options: [
					{
						name: 'fields',
						displayName: 'Campo',
						values: [
							{
								displayName: 'Nombre',
								name: 'name',
								type: 'string',
								default: '',
								description: 'Nombre del campo en el JSON',
							},
							{
								displayName: 'Valor',
								name: 'value',
								type: 'string',
								default: '',
								description: 'Valor del campo (acepta expresiones)',
							},
						],
					},
				],
				description: 'Campos adicionales para agregar al body del request',
			},
			{
				displayName: 'Opciones',
				name: 'options',
				type: 'collection',
				placeholder: 'Agregar opción',
				default: {},
				options: [
					{
						displayName: 'Timeout (ms)',
						name: 'timeout',
						type: 'number',
						default: 30000,
						description: 'Timeout de la petición en milisegundos',
					},
					{
						displayName: 'Seguir Redirecciones',
						name: 'followRedirects',
						type: 'boolean',
						default: true,
						description: 'Whether to follow HTTP redirects',
					},
				],
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				// URL del servicio
				const url = this.getNodeParameter('url', i) as string;

				// Conversación
				const threadId = this.getNodeParameter('threadId', i) as string;
				const messageRaw = this.getNodeParameter('message', i);
				const subscriberId = this.getNodeParameter('subscriberId', i) as string;
				const previousResponseId = this.getNodeParameter('previousResponseId', i) as string;
				const assistant = this.getNodeParameter('assistant', i) as string;

				// Cliente
				const telefono = this.getNodeParameter('telefono', i) as string;
				const telefonoPrompt = this.getNodeParameter('telefonoPrompt', i) as string;
				const nombreNull = this.getNodeParameter('nombreNull', i) as string;
				const direccionCliente = this.getNodeParameter('direccionCliente', i) as string;
				const direccionNull = this.getNodeParameter('direccionNull', i) as string;
				const ciudadCliente = this.getNodeParameter('ciudadCliente', i) as string;
				const indicacionesDireccionNull = this.getNodeParameter('indicacionesDireccionNull', i) as string;

				// Pedido
				const formaDePagoNull = this.getNodeParameter('formaDePagoNull', i) as string;
				const estadoDelPagoNull = this.getNodeParameter('estadoDelPagoNull', i) as string;
				const valorDomicilio = this.getNodeParameter('valorDomicilio', i) as string;
				const horaDeEntregaNull = this.getNodeParameter('horaDeEntregaNull', i) as string;
				const productosAgotados = this.getNodeParameter('productosAgotados', i) as string;
				const disponibilidadBowls = this.getNodeParameter('disponibilidadBowls', i) as string;

				// LLM Config
				const modelId = this.getNodeParameter('modelId', i) as string;
				const llmId = this.getNodeParameter('llmId', i) as string;
				const modelClaude = this.getNodeParameter('modelClaude', i) as string;
				const effort = this.getNodeParameter('effort', i) as string;
				const thinking = this.getNodeParameter('thinking', i) as number;
				const bufferSeconds = this.getNodeParameter('bufferSeconds', i) as number;
				const useCacheControl = this.getNodeParameter('useCacheControl', i) as string;
				const apiKey = this.getNodeParameter('apiKey', i) as string;

				// Imagen
				const includeImage = this.getNodeParameter('includeImage', i) as boolean;

				// Opciones
				const options = this.getNodeParameter('options', i) as {
					timeout?: number;
					followRedirects?: boolean;
				};

				// Procesar mensaje - pasar directo, preservando saltos de línea
				let message: any = messageRaw;
				if (typeof message === 'string') {
					// Reemplazar saltos de línea literales escapados por saltos reales
					message = message.replace(/\\n/g, '\n');
				}

				// Convertir strings "null" a null real
				const toNull = (val: string) => (val === 'null' || val === '' || val === 'undefined') ? null : val;

				// Construir body
				const body: Record<string, any> = {
					thread_id: toNull(threadId),
					message,
					subscriber_id: subscriberId,
					use_cache_control: useCacheControl,
					direccionCliente,
					telefono,
					nombreNull: toNull(nombreNull),
					thinking,
					modelID: modelId,
					direccionNull: toNull(direccionNull),
					telefonoPrompt,
					valor_domicilio: valorDomicilio,
					assistant,
					ciudadCliente,
					forma_de_pago_null: toNull(formaDePagoNull),
					llmID: llmId,
					productos_agotados: productosAgotados,
					previous_response_id: toNull(previousResponseId),
					disponibilidad_bowls: disponibilidadBowls,
					indicaciones_direccionNull: toNull(indicacionesDireccionNull),
					horaDeEntregaNull: toNull(horaDeEntregaNull),
					estado_del_pago_null: toNull(estadoDelPagoNull),
					buffer_seconds: bufferSeconds,
					api_key: apiKey || '',
					model_claude: modelClaude,
					effort,
				};

				// Agregar campos extra al body
				const extraFields = this.getNodeParameter('extraFields', i) as { fields?: Array<{ name: string; value: string }> };
				if (extraFields.fields) {
					for (const field of extraFields.fields) {
						if (field.name) {
							body[field.name] = field.value;
						}
					}
				}

				// Agregar imagen si está habilitada
				if (includeImage) {
					const imageValue = this.getNodeParameter('imageBase64Field', i) as string;
					const mediaType = this.getNodeParameter('imageMediaType', i) as string;

					// Si el valor es largo (>100 chars) es el base64 directo
					// Si es corto es un nombre de campo para buscar en el item
					const base64Data = imageValue.length > 100
						? imageValue
						: (items[i].json[imageValue] as string) || '';

					body.images = [
						{
							data: base64Data,
							media_type: mediaType,
						},
					];
				}

				// Hacer la petición HTTP
				const requestOptions: any = {
					method: 'POST' as IHttpRequestMethods,
					uri: url,
					body,
					json: true,
					timeout: options.timeout || 30000,
					followRedirect: options.followRedirects !== false,
				};

				const response = await this.helpers.request(requestOptions);

				returnData.push({
					json: typeof response === 'string' ? { response } : response,
					pairedItem: { item: i },
				});
			} catch (error: any) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: error.message,
						},
						pairedItem: { item: i },
					});
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
