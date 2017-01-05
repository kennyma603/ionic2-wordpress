import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import {SITE_URL, UtilService} from '../index';

@Injectable()
export class WpService {

    wpApiURL: string = SITE_URL + '/wp-json/wp/v2';

    constructor(
        private authHttp: AuthHttp, 
        private util:UtilService,
        private http: Http
    ) {
    }

    getCurrentUserProfile() {
        return this.authHttp.get(this.wpApiURL + '/users/me')
            .map(res => res.json());
    }

    userAddComment(paramsObj) {
        let params = this.util.transformRequest(paramsObj);
        return this.authHttp.post(this.wpApiURL + '/comments?' + params, JSON.stringify({}))
            .map(res => res.json());
    }

    getPosts(paramsObj) {
        let params = this.util.transformRequest(paramsObj);
        return this.http.get(this.wpApiURL + '/deal?_embed&' + params)
            .map(res => res.json());
    }

    getCommentsByPostId(paramsObj) {
        let params = this.util.transformRequest(paramsObj);
        return this.http.get(this.wpApiURL + '/comments?' + params)
            .map(res => res.json());
    }
}