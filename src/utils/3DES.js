import cryptoJs from 'crypto-js/crypto-js';

const KEY = cryptoJs.enc.Utf8.parse("1234567890ABCDEF");//  密鑰        長度必須為16位
const IV = cryptoJs.enc.Utf8.parse("12345678");           //  初始向量    長度8位


//隨機生成指定數量的16進制key
export const generatekey = (num) => {

    let library = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let key = "";
    for (var i = 0; i < num; i++) {
        let randomPoz = Math.floor(Math.random() * library.length);
        key += library.substring(randomPoz, randomPoz + 1);


    }
    return key;

}

//3DES(CBC)加密
export const encryptByCBC = function (message, keyStr, ivStr) {

    let key = KEY
    let iv = IV

    if (keyStr && ivStr) {
        key = cryptoJs.enc.Utf8.parse(keyStr);
        iv = cryptoJs.enc.Utf8.parse(ivStr);
    }

    let srcs = cryptoJs.enc.Utf8.parse(message);
    //加密模式為CBC,補碼方式為PKCS5Padding(PKCS7)

    let encrypted = cryptoJs.TripleDES.encrypt(srcs, key,
        {
            iv: iv,
            mode: cryptoJs.mode.CBC,
            padding: cryptoJs.pad.Pkcs7

        });
    return cryptoJs.enc.Base64.stringify(encrypted.ciphertext);

}

//3DES(CBC)解密
export const decryptByCBC = function (message, keyStr, ivStr) {

    let key = KEY
    let iv = IV

    if (keyStr && ivStr) {
        key = cryptoJs.enc.Utf8.parse(keyStr);
        iv = cryptoJs.enc.Utf8.parse(ivStr);
    }
  
    let base64 = cryptoJs.enc.Utf8.parse(message);
    let srcs = cryptoJs.enc.Utf8.parse(base64);
    //解密模式為CBC,補碼方式為PKCS5Padding(PKCS7)

    let decrypt = cryptoJs.TripleDES.decrypt(srcs, key,
        {
            iv: iv,
            mode: cryptoJs.mode.CBC,
            padding: cryptoJs.pad.Pkcs7

        });
    let decryptedStr = decrypt.toString(cryptoJs.enc.Utf8);
    return decryptedStr.toString();

}

export default{
encryptByCBC,
decryptByCBC
}