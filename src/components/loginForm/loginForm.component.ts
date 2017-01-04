import { Component } from '@angular/core';
import { AuthService } from '../../services/index';

@Component({
    selector: 'login-form',
    templateUrl: './login-form.html',
})
export class LoginFormComponent {

    loginStatusMessage: string;
    loginModel: any = {}

    constructor(private auth: AuthService) {
    }

    login(e) {
        this.loginStatusMessage = '';
        this.auth.login(this.loginModel.username, this.loginModel.password)
            .subscribe(
                result => {
                    if (result === true) {
                        // login successful
                        this.loginStatusMessage = 'Login successful!';
                    } else {
                        // login failed - token issue
                        this.loginStatusMessage = 'Something wrong with token.';
                    }
                },
                result => {
                    //rest call error
                    this.loginStatusMessage = 'Username or password is incorrect';
                }
            );
        return false;
    }

    logout() {
        this.auth.logout();
    }
}