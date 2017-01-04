import {Injectable} from '@angular/core';
import {LoadingController , ToastController} from 'ionic-angular';

@Injectable()
export class UtilService {
    public loadingController: LoadingController;

    constructor(private toastCtrl: ToastController, private loadingCtrl: LoadingController) {

    }

    getLoader(content) {
        let loading = this.loadingCtrl.create({
            content: content
        });
        return loading;
    }
    
    getToast(message) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'top'
        });
        return toast;
    }

    transformRequest(obj) {
        let p, str;
        str = [];
        for (p in obj) {
            str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
        }
        return str.join('&');
    }
}