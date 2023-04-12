/*Data*/
export interface Data {
  message: string;
  code: number;
  token: string;
}

/*Headers*/
export interface Headers {
  contentlength: string;
  contenttype: string;
}

/*Transitional*/
export interface Transitional {
  silentJSONParsing: boolean;
  forcedJSONParsing: boolean;
  clarifyTimeoutError: boolean;
}

/*TransformRequest*/
export interface TransformRequest {}

/*TransformResponse*/
export interface TransformResponse {}

/*FormData*/
export interface FormData {}

/*Env*/
export interface Env {
  FormData: FormData;
}

/*Headers*/
export interface Headers {
  Accept: string;
  ContentType: string;
}

/*Config*/
export interface Config {
  transitional: Transitional;
  transformRequest: TransformRequest[];
  transformResponse: TransformResponse[];
  timeout: number;
  xsrfCookieName: string;
  xsrfHeaderName: string;
  maxContentLength: number;
  maxBodyLength: number;
  env: Env;
  headers: Headers;
  baseURL: string;
  method: string;
  url: string;
  data: string;
}

/*tsModel9*/
export interface tsModel9 {
  data: Data;
  status: number;
  statusText: string;
  headers: Headers;
  config: Config;
}
