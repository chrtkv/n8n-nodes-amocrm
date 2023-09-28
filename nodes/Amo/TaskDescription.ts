import type { INodeProperties } from 'n8n-workflow';

import { prepareBody } from './GenericFunctions'

export const taskOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		default: 'getAll',
		displayOptions: {
			show: {
				resource: ['task'],
			},
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many tasks',
				routing: {
					request: {
						method: 'GET',
						url: '/api/v4/tasks',
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
						url: '/api/v4/tasks',
						headers: {
							'Content-Type': 'application/json',
						},
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
				resource: ['task'],
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
		displayName: 'Limit',
		description: 'Max number of results to return',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 50,
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['getAll'],
			},
		},
		routing: {
			send: {
				type: 'query',
				property: 'limit',
				value: '={{ $value }}',
			},
		},
	},
	{
		displayName: 'Filter',
		name: 'filter',
		type: 'collection',
		default: {},
		placeholder: 'Filter Result',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Responsible User ID',
				description: 'Filter by responsible user ID. You can pass either a single ID or comma-separated multiple IDs.',
				name: 'responsible_user_id',
				type: 'string',
				default: '',
				routing: {
					send: {
						property: 'filter[responsible_user_id]',
						value: '={{ $value.split(",") }}',
					},
				},
			},
			{
				displayName: 'Is Completed',
				description: 'Filter by completed status. 1 is completed, 0 is not.',
				name: 'is_completed',
				type: 'string',
				default: '',
				routing: {
					send: {
						property: 'filter[is_completed]',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Task Type',
				description: 'Filter by task type. You can pass either a single type ID or comma-separated multiple type IDs.',
				name: 'task_type',
				type: 'string',
				default: '',
				routing: {
					send: {
						property: 'filter[task_type]',
						value: '={{ $value.split(",") }}',
					},
				},
			},
			{
				displayName: 'Entity Type',
				description: 'Filter by assigned entity type',
				name: 'entity_type',
				type: 'options',
				default: 'leads',
				options: [
					{
						name: 'Leads',
						value: 'leads',
					},
					{
						name: 'Contacts',
						value: 'contacts',
					},
					{
						name: 'Companies',
						value: 'companies',
					},
					{
						name: 'Customers',
						value: 'customers',
					},
				],
				routing: {
					send: {
						property: 'filter[entity_type]',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Task ID',
				description: 'Filter by task ID. You can pass either a single ID or comma-separated multiple IDs.',
				name: 'task_id',
				type: 'string',
				default: '',
				routing: {
					send: {
						property: 'filter[id]',
						value: '={{ $value.split(",") }}',
					},
				},
			},
		],
	},
	{
		displayName: 'Sort',
		name: 'sort',
		type: 'collection',
		default: {},
		placeholder: 'Sort Result',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Sorting Order',
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
						name: 'Complete Till',
						value: 'complete_till',
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

export const taskFields: INodeProperties[] = [
	...getAllOperation,
	...createOperation,
];
