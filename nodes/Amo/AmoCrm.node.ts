import {
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import { leadFields, leadOperations } from './LeadDescription';
import { contactFields, contactOperations } from './ContactDescription';
import { taskFields, taskOperations } from './TaskDescription';

export class AmoCrm implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'AmoCRM',
		name: 'amoCrm',
		icon: 'file:amocrm.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{ $parameter["operation"] + ": " + $parameter["resource"] }}',
		description: 'Consume AmoCRM API',
		defaults: {
			name: 'AmoCRM',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'amoOAuth2Api',
				required: true,
			},
		],
		requestDefaults: {
			returnFullResponse: true,
			baseURL: '={{ $credentials.baseUrl }}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Lead',
						value: 'lead',
					},
					{
						name: 'Contact',
						value: 'contact',
					},
					{
						name: 'Task',
						value: 'task',
					}
				],
				default: 'lead',
				required: true,
			},

			...leadOperations,
			...leadFields,

			...contactOperations,
			...contactFields,

			...taskOperations,
			...taskFields,
		],
	}
}
