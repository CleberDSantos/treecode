import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { HashTable } from "./hashtable";

export module Ajax {

    export enum MethodType {
        GET,
        POST,
        PUT,
        DELETE
    }

    export class RequestConfig {

        public methodType: MethodType;
        public url: string;
        public data: any;
        public header: HashTable;
        public "content-type": string;


        constructor() {
            this.header = new HashTable();
        }

    }

    @Injectable()
    export class Request {

        constructor(private http: Http) { }

        public send(config: RequestConfig): Observable<any> {

            let response: Observable<Response>;

            try {

                const headers = this.getHeaders(config.header);

                switch (config.methodType) {

                    case MethodType.GET:

                        response = this.http.get(config.url, headers);
                        break;

                    case MethodType.POST:

                        if (config.data === null) {
                            throw new Error("Server error method post: Object body can not be null.");
                        }

                        response = this.http.post(config.url, config.data, headers);
                        break;

                    case MethodType.PUT:

                        if (config.data === null) {
                            throw new Error("Server error method post: Object body can not be null.");
                        }

                        response = this.http.put(config.url, config.data, headers);
                        break;

                    case MethodType.DELETE:

                        response = this.http.delete(config.url, headers);
                        break;

                    default:
                        throw new Error("Server error method type: Not possible find a method type valid");

                }

                return response.map((res: Response) => {
                    return res.json();
                });

            } catch (e) {
                throw new Error("Server error: " + e);
            }

        }

        private getHeaders(header: HashTable): RequestOptions {

            if (header) {

                var headers: Headers = new Headers();
                var bearer = localStorage.getItem("Bearer");

                if (header.lookup("content-type") == null) {
                    headers.append("content-type", "application/json");
                }

                if (bearer) {
                    headers.append("Authorization", "Bearer " + bearer);
                }

                header.map((key, data) => { headers.append(key, data); }, null);

            }

            return new RequestOptions({ headers: headers });
        }

        public SendRequest(url: string, method?: Ajax.MethodType, data?: any, headers?: HashTable): Observable<any> {

            if (!url) {
                throw new ReferenceError("No service location provided");
            }

            var requestConfig = new Ajax.RequestConfig();
            requestConfig.url = url;

            if (headers) {
                requestConfig.header = headers;
            }

            requestConfig.methodType = method ? method : Ajax.MethodType.GET;

            if (data) {
                requestConfig.data = data;
            }

            return this.send(requestConfig);
        }
    }
}