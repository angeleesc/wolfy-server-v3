
import { initializeApp, cert } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"
import env from "dotenv";
env.config();
console.log("--- type --")
console.log(process.env.TYPE)
// console.log(process.env.PROJ)

const key = {
    "type": "service_account",
    "project_id": "wolfy-global",
    "private_key_id": "c7e804abf43af3747c35c715bd18c2425c39b0e7",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCmdn5UDzhCX42o\n8UG1+nEPk6muBApAbLv2jRRHVJElUi3XIP/YGej5v+9qAQ4EY3ehjcCNWTOpUQ53\nuvFNqwGKbROPBIxL1ECsx3yw/p1QZW5ff3IXPGgrhKO3H7TJufrEOdmGBMn+OXkW\no0N602IUfoH+T9hS5JplQMQj0wd+OtQgGahyGUs7x5AZWaKlZXyD8FgmcYJxZPnh\nz0IqXIayY6jDMLDuJVz31vMZnTPWJWrllWuzvyDLf4CouO6mpz53GqeJFSRrJu++\n0GIx12sw+jDqaNw+MFekJvCxlmTHpsBeBEgUYocaDpo6jJs/+pxS55lzm9bRWHsg\nJmg3ZpUrAgMBAAECggEACMQuEZ3ePUXsSedaqeC52jN7427Rs2QxNIy9cqbgy0cG\npFECkuOFF2dPjmo7zhNcQM/G7NVebnOXACCCMLA+xobJWZDIaqiPjLR8u+giFL0i\nu44Uo2X0/nBfxsxj/Z5OYc3CHNgHuIcCT3o4RYb4SqgBjzOulWmgj+XXQ85gk08j\n+zzqa1t6PnKedOMxx2k54XIYoP1C75C94eV1RIJxTvCG5qcXZtxbUYVQMAqzCaZP\nugAOolVgV2AStFaw71ENQnQRmr4lwYNoqw/qqgzs2RDqQkbxqhsRuQdRZqtKO4qv\nMcCqdqw5VPsMW6vRltNseJct48KkxpRHeuDeZzby0QKBgQDg+9RrHNbL5EqR7Upf\n/OC4W40ZDAK7/fr+77wbRBge3Q3Ej2d1nP2eYmsmOcpDtPH3AZIpfQgEf5WDX+2G\n9cIMZlIvuoHTdRjlQL2QT/SImmSy/8gu9p5tESpElAEJMck8coNc36DaXl+DN6mz\nWX+aTcz4ten2dAU2EyZbdas3DwKBgQC9aVWVVTfL5SV/xDEuyLwNyaTo7mGgj4Z0\nZUqll2qxaRpRDVCe0Bwo9We3tVSdB1Z1snr6bvzuv0xjUUuVIm6r/sipWDY3H81+\n9eVMExHLpPEfVII4Zup+ORwKd1Ua/fzDIifYHkFnBNdKu0U3hAA6PjHVYmvESRJW\nkaW1nt5gJQKBgE6+lZhv3ZY7bwYoQXHbNmQQVxA/Le3SdTkpe3MnoDGdOSZk8tct\nfW8kD1CvxWVxPYcwm5G920KHzTLQLnigJ6zjWzytUKdMQsxqnm6WLYZqU3h7Ifue\nAdE2ws6B5uLq8/4eLnAhLVGA2nk40EKfvpOpS2Z5dUv3S6OjjDdStfxtAoGANQ0v\nv2fi/OTtn9+ftu7aXTJBUkySY5pPmoJUahUC+TXq/RCxqAm6GW7C4h2T2XeYq9aV\nw1ca2PQTvS2j8d13Cg2Ovn/Kj54EvK66zpf4wAUu1AujfZC11SzBwdyypaDGDxGd\n/1ZaEzSz6GaTeH0sYyPQaWfrr0qYLE8XDsu0lVECgYBzOLgeAV62isxqTAIaD4Z9\nAOvu/Axy7F386Q+JpFdwEQPHTGG/vSe/LoeOPKrqcKz9HKq3JXWqX/ADVsgduS0y\n4EOM5IuZCE6HCllNWNUWhwl9bK5ZyziG5Bwcg33wpKKeNpvHwKJGaENKtlj7Wdm6\nENzy4DUBLTu0awoWEpuCWg==\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-kc9gf@wolfy-global.iam.gserviceaccount.com",
    "client_id": "101327604188627931865",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-kc9gf%40wolfy-global.iam.gserviceaccount.com"
}

const admin = initializeApp({
    credential: cert(key)
})


export const db = getFirestore()


