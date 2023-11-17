import {
	IDataObject,
	IExecuteFunctions,
	IExecuteSingleFunctions,
	IHookFunctions,
	IHttpRequestOptions,
	ILoadOptionsFunctions,
	JsonObject,
	NodeApiError,
} from 'n8n-workflow';
import { OptionsWithUri } from 'request';

import { AmoCustomField, CustomFields } from './types';

export async function prepareBody (this: IExecuteSingleFunctions, requestOptions: IHttpRequestOptions): Promise<IHttpRequestOptions> {
	const {
		resource,
		operation,
		json_data,
		...parameters
	} = this.getNode().parameters;

	const { fields: customFieldsList = [] } = parameters.custom_fields_values as CustomFields;
	const customFields : AmoCustomField[] = customFieldsList
		?.map(({ field, value }) => ({ field_id: field, values: [{ value }] }));
	const joinedCustomFields : AmoCustomField[] = JSON.parse(json_data as string).custom_fields_values
	  ?.filter((cf: AmoCustomField) => !customFields.some(pcf => pcf?.field_id === cf?.field_id))
		?.concat(customFields);

	const dataToSend = [{ ...parameters, custom_fields_values: joinedCustomFields ?? customFields }];

	requestOptions.body = dataToSend;
	return requestOptions;
}

export async function amoApiRequest(
	this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
	method: string,
	endpoint: string,
	body: IDataObject,
	query?: IDataObject,
	dataKey?: string,
): Promise<any> {
	const credentials = await this.getCredentials('amoOAuth2Api');

	if (query === undefined) {
		query = {};
	}

	const options: OptionsWithUri = {
		headers: {},
		method,
		qs: query,
		uri: `${credentials.baseUrl}${endpoint}`,
		json: true,
	};

	if (Object.keys(body).length !== 0) {
		options.body = body;
	}

	try {
		const responseData = await this.helpers.requestWithAuthentication.call(
			this,
			'amoOAuth2Api',
			options,
		);

		if (responseData.success === false) {
			throw new NodeApiError(this.getNode(), responseData as JsonObject);
		}

		if (dataKey === undefined) {
			return responseData;
		} else {
			return responseData[dataKey] as IDataObject;
		}
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}
