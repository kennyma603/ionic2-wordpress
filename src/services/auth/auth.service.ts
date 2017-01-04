import { Injectable } from '@angular/core';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SITE_URL, UtilService } from '../index';

@Injectable()
export class AuthService {

    public token: string;
    contentHeader: Headers = new Headers({ "Content-Type": "application/json" });
    jwtHelper: JwtHelper = new JwtHelper();
    wpApiURL: string = SITE_URL + '/wp-json/wp/v2';
    wpJWTURL: string = SITE_URL + '/wp-json/jwt-auth/v1';

    constructor(private http: Http, private util:UtilService) {
        this.token = localStorage.getItem('id_token');
    }

    public authenticated() {
        return tokenNotExpired('id_token', this.token);
    }

    public login(username: string, password: string) {
        let loginQuery = {
            username: username,
            password: password
        }

        return this.http.post(this.wpJWTURL + '/token?' + this.util.transformRequest(loginQuery), {}, { headers: this.contentHeader })
            .map(response => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                if (token) {
                    // set token property
                    this.token = token;

                    localStorage.setItem('id_token', token);

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    //localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));

                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            })
            .catch((error:any) => {
            return Observable.throw(false)});
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('id_token');
        localStorage.removeItem('currentUser');
    }

}