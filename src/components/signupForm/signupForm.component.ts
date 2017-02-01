import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { WpService } from '../../services/index';

@Component({
    selector: 'signup-form',
    templateUrl: './signupForm.html'
})

export class SignupFormComponent {

    signupStatusMessage: string;
    signupModel: any = {}
    isLoading: boolean = false;

    constructor(private wp: WpService, private http: Http) {
    }

    signup(e) {
        this.isLoading = true;
        this.signupStatusMessage = '';
        this.wp.signup(this.signupModel)
            .subscribe(
                result => {
                    if (result === true) {
                        // login successful
                        this.signupStatusMessage = 'sign up successful!';
                    } else {
                        // login failed - token issue
                        this.signupStatusMessage = 'Something wrong with token.';
                    }
                    this.isLoading = false;
                },
                result => {
                    //rest call error
                    this.isLoading = false;
                    this.signupStatusMessage = 'Username or password is incorrect';
                }
            );
        return false;
    }    

}