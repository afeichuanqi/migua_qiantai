const crypto = require('crypto');

export default class md5Util {
    constructor(data) {
        this.data = data;
    }

    getMd5(password) {
        const md5 = crypto.createHash('md5');
        return md5.update(this.data).digest('base64');
    }

    getMd5_(mingma) {
        const initMd5 = this.getMd5(mingma);
        return this.getMd5(initMd5.substr(4, 7) + initMd5);
    }

}