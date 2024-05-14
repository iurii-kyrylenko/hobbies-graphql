import { RESTDataSource } from '@apollo/datasource-rest';

interface CaptchaResult {
    success: boolean;
    "error-codes"?: string[];
}

export class CaptchaAPI extends RESTDataSource {
    override baseURL = process.env.CAPTCHA_API;

    verifyCaptchaResponse(captchaToken: string) {
        return this.post<CaptchaResult>("siteverify", {
            params: {
                secret: process.env.CAPTCHA_SECRET,
                response: captchaToken,
            },
        });
    };
}
