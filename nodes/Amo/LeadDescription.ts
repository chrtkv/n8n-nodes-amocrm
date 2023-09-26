import type { INodeProperties } from 'n8n-workflow';

import { prepareBody } from './GenericFunctions'

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
			{
				name: 'Create',
				value: 'create',
				action: 'Create leads',
				routing: {
					send: {
						preSend: [prepareBody],
						type: 'body',
					},
					request: {
						method: 'POST',
						url: '/api/v4/leads',
						headers: {
							'Content-Type': 'application/json',
						},
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
						name: 'Contacts',
						value: 'contacts',
					},
					{
						name: 'Is Price Modified By Robot',
						value: 'is_price_modified_by_robot',
					},
					{
						name: 'Loss Reason',
						value: 'loss_reason',
					},
					{
						name: 'Only Deleted',
						value: 'only_deleted',
						description: 'If this parameter is used, the API response will include deleted leads still in the bin',
					},
					{
						name: 'Source ID',
						value: 'source_id',
					},
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
						property: '={{ "order[" + $parameter["options"]["order_by"] + "]" }}', // TODO: make it depends on order field
						value: '={{ $parameter["options"]["order"] }}',
					},
				},
			},
		],
	},
];

const createOperation: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['create'],
			},
		},
		description: 'Lead name',
	},
	{
		displayName: 'Price',
		name: 'price',
		type: 'number',
		default: null,
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['create'],
			},
		},
		description: 'Lead budget',
	},
	{
		displayName: 'Status ID',
		name: 'status_id',
		type: 'number',
		default: null,
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['create'],
			},
		},
		description: 'Status ID. Default value is the first status of the main pipeline.',
	},
	{
		displayName: 'Lead Data',
		name: 'data',
		type: 'json',
		default: '',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['create'],
			},
		},
		description: 'Any other fields to send',
	}
];

export const leadFields: INodeProperties[] = [
	...getOperation,
	...getAllOperation,
	...createOperation,
];
