import { google } from 'googleapis';

const identityToolkit = google.identitytoolkit({
    auth: 'AIzaSyDIPXskfIvZnGU-h8SYsNnT7R937b0BedE',
    version: 'v3',
  });

export const sendAuthOtp = (phone, recaptchaToken) => {
    try {
        const response = await identityToolkit.relyingparty.sendVerificationCode({
            phone,
            recaptchaToken: recaptchaToken,
        });

        // save sessionInfo into db. You will need this to verify the SMS code
        const sessionInfo = response.data.sessionInfo;
        
        console.log(sessionInfo)
        if(!sessionInfo) {
            return {
                status: false
            }
        }

        return {
            status: true,
            sessionInfo: sessionInfo
        }
    } catch (error) {
        return {
            error: {
                code: 500,
                message: error.message
            }
        }
    }
}

export const verifyAuthToken = (verificationCode, phoneSessionId) => {
    try {
        const response = await identityToolkit.relyingparty.verifyPhoneNumber({
            code: verificationCode,
            sessionInfo: phoneSessionId,
          });

        // save sessionInfo into db. You will need this to verify the SMS code
        // const sessionInfo = response.data.sessionInfo;
        
        console.log(response)
        if(!response) {
            return {
                status: false
            }
        }

        return {
            status: true,
            sessionInfo: response
        }
    } catch (error) {
        return {
            error: {
                code: 500,
                message: error.message
            }
        }
    }
}