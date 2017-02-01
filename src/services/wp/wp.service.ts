import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import {SITE_URL, UtilService} from '../index';

@Injectable()
export class WpService {

    wpApiURL: string = SITE_URL + '/wp-json/wp/v2';
    comments: any = [];
    jwtHelper: JwtHelper = new JwtHelper();

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

    signup(paramsObj) {
        let params = this.util.transformRequest(paramsObj);
        console.log(params);
        return this.http.post(this.wpApiURL + '/users/?' + params, JSON.stringify(paramsObj))
            .map(
                res => res.json()
            );
    }


    userAddComment(paramsObj) {
        let params = this.util.transformRequest(paramsObj);
        console.log('sending request');
        return this.authHttp.post(this.wpApiURL + '/comments?' + params, JSON.stringify({}))
            .map(
                res => {
                    let newComment = res.json();
                    this.comments.push(newComment);
                    console.log(this.comments);
                    return newComment;
                }
            );
    }

    userUpdateComment(id, paramsObj) {
        let params = this.util.transformRequest(paramsObj);
        console.log('sending request');
        return this.authHttp.put(this.wpApiURL + '/comments/'+ id + '?' + params, JSON.stringify({}))
            .map(
                res => {
                    let updatedComment = res.json();
                    //this.comments.push(updatedComment);
                    for(let i=0; i<this.comments.length; i++) {
                        if (this.comments[i].id === id) {
                            this.comments[i] = updatedComment;
                            console.log('old', this.comments[i]);
                            break;
                        }
                    }

                    console.log(this.comments);
                    return updatedComment;
                }
            );
    }

    getPosts(paramsObj) {
        let params = this.util.transformRequest(paramsObj);
        return this.http.get(this.wpApiURL + '/deal?_embed&' + params)
            .map(res => res.json());
    }

    getCommentsByPostId(paramsObj) {
        let params = this.util.transformRequest(paramsObj);
        return this.http.get(this.wpApiURL + '/comments?' + params)
            .map(res => {
                this.comments = res.json();
                return this.comments;
            });
    }

    deleteComment(comment) {
        return this.authHttp.delete(this.wpApiURL + '/comments/' + comment.id)
            .map(res => {
                console.log(res.json());
                this.comments.splice(this.comments.indexOf(comment), 1)
                return res.json();
            });
    }

    public getCurrentAuthorId(): number {
        let token:any = localStorage.getItem('id_token');
        if(token) {
            token = this.jwtHelper.decodeToken(token);
            return Number(token.data.user.id);
        } else{
            return null;
        }
    }


}