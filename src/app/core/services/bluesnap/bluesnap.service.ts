import { Injectable } from '@angular/core';

@Injectable()
export class BlueSnapService {

    bluesnap: any =  new BlueSnap(CONFIG.BLUESNAP_KEYS.NAMER);

    get() {
        return this.bluesnap;
    }

    encrypt(form: string) {
        return this.bluesnap.encrypt;
    }

}
