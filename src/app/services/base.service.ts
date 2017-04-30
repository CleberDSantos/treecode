import { Observable } from "rxjs/Rx";
import { Injectable } from "@angular/core";
import { Headers, RequestOptions, Response } from "@angular/http";
import { HashTable } from "../helpers/hashtable";
import { Ajax } from "../helpers/ajax";

@Injectable()
export class BaseService {

    protected appAjax: Ajax.Request;

    constructor(appAjax: Ajax.Request) {
        this.appAjax = appAjax;
    }

    public SendRequest(url: string, method?: Ajax.MethodType, data?: any, headers?: HashTable): Observable<any> {

        if (!url) {
            throw new ReferenceError("No service location provided");
        }

        const requestConfig = new Ajax.RequestConfig();
        requestConfig.url = url;

        if (headers) {
            requestConfig.header = headers;
        }

        requestConfig.methodType = method ? method : Ajax.MethodType.GET;

        if (data) {
            requestConfig.data = data;
        }

        return this.appAjax.send(requestConfig);

    }

}