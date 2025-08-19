/**
 * AJ Security SDK for javascript
 */
if (!window.aj)
    window.aj = {};

aj.security = {};

; (function () {
    aj.security.Captcha = function (imgApi, captchaImg) {
        this.imgApi = imgApi;
        if (typeof captchaImg == 'string')
            this.captchaImg = document.querySelector(captchaImg);
        else
            this.captchaImg = captchaImg;

        this.init();
        this.captchaImg.style.cursor = "pointer";
        this.captchaImg.onclick = this.init.bind(this);
    }

    aj.security.Captcha.prototype.imgApi = "";
    aj.security.Captcha.prototype.CAPTCHA_UUID = "";
    aj.security.Captcha.prototype.init = function () {
        this.CAPTCHA_UUID = getUUID();
        this.captchaImg.src = `${this.imgApi}?uuid=${this.CAPTCHA_UUID}`;
    }

    function getUUID() {
        if (crypto && crypto.randomUUID)
            return crypto.randomUUID();
        else return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = (Math.random() * 16) | 0;
            const v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        })
    }
})();