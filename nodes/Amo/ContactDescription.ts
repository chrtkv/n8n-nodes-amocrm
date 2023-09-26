import type { INodeProperties } from 'n8n-workflow';

export const contactOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		default: 'get',
		displayOptions: {
			show: {
				resource: ['contact'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get a contact',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/v4/contacts/{{ $parameter.contactId }}',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many contacts',
				routing: {
					request: {
						method: 'GET',
						url: '/api/v4/contacts',
					},
				},
			},
			{
				name: 'Create',
				value: 'create',
				action: 'Create contacts',
				routing: {
					request: {
						method: 'POST',
						url: '/api/v4/contacts',
						headers: {
							'Content-Type': 'application/json',
						}
					},
				},
			},
		],
	},
];

const getOperation: INodeProperties[] = [
	{
		displayName: 'Contact ID',
		name: 'contactId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['get'],
			},
		},
		description: 'Amo contact ID',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		default: {},
		placeholder: 'Add Option',
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['get'],
			},
		},
		options: [
			{
				displayName: 'With',
				description: 'Whether to include additional data',
				name: 'with',
				type: 'multiOptions',
				default: [],
				options: [
					{
						name: 'Catalog Elements',
						value: 'catalog_elements',
					},
					{
						name: 'Leads',
						value: 'leads',
					},
					{
						name: 'Customers',
						value: 'customers',
					}
				],
				routing: {
					send: {
						type: 'query',
						property: 'with',
						value: '={{ $value }}',
					},
				},
			},
		],
	},
];

export const contactFields: INodeProperties[] = [
	...getOperation,
	// ...getAllOperation,
	// ...createOperation,
];
