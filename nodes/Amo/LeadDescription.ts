import type { INodeProperties } from 'n8n-workflow';

export const leadOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		default: 'get',
		displayOptions: {
			show: {
				resource: ['lead'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get a lead',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/v4/leads/{{ $parameter.leadId }}',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many leads',
				routing: {
					request: {
						method: 'GET',
						url: '/api/v4/leads',
					},
				},
			},
		],
	},
];

const getOperation: INodeProperties[] = [
	{
		displayName: 'Lead ID',
		name: 'leadId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['get'],
			},
		},
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		default: {},
		placeholder: 'Add Option',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['get'],
			},
		},
		options: [
			{
				displayName: 'With',
				description: 'Whether to include additional data (contacts, loss_reason, etc.)',
				name: 'with',
				type: 'string',
				default: '',
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

const getAllOperation: INodeProperties[] = [
	{
		displayName: 'Page',
		name: 'page',
		type: 'number',
		default: null,
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['getAll'],
			},
		},
		routing: {
			send: {
				type: 'query',
				property: 'page',
				value: '={{ $value }}',
			},
		},
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		default: {},
		placeholder: 'Add Option',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'With',
				description: 'Whether to include additional data (contacts, loss_reason, etc.)',
				name: 'with',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'query',
						property: 'with',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Limit',
				description: 'Max number of results to return',
				name: 'limit',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				default: 50,
				routing: {
					send: {
						type: 'query',
						property: 'limit',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Query',
				description: 'Search query',
				name: 'query',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'query',
						property: 'query',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Order',
				description: 'Sorting order',
				name: 'order',
				type: 'options',
				default: 'asc',
				options: [
					{
						name: 'Ascending',
						value: 'asc',
					},
					{
						name: 'Descending',
						value: 'desc',
					},
				],
			},
			{
				displayName: 'Order By',
				name: 'order_by',
				type: 'options',
				default: 'created_at',
				options: [
					{
						name: 'Created',
						value: 'created_at',
					},
					{
						name: 'Updated',
						value: 'updated_at',
					},
					{
						name: 'ID',
						value: 'id',
					},
				],
				routing: {
					send: {
						type: 'query',
						property: '={{ "order[" + $parameter["options"]["order_by"] + "]" }}',
						value: '={{ $parameter["options"]["order"] }}',
					},
				},
			},
		],
	}
];

export const leadFields: INodeProperties[] = [
	...getOperation,
	...getAllOperation,
];
