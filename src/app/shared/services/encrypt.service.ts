import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptService {
  constructor() { }

  encryptAES_Utf8(plainText: string): string {
    let _key = CryptoJS.enc.Utf8.parse('5171061885171061');
    let _iv = CryptoJS.enc.Utf8.parse('5171061885171061');
    return CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(plainText), _key,
      {
        keySize: 128 / 8,
        iv: _iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }).toString();
  }

  decryptAES_Utf8(cipherText: string): string {
    let _key = CryptoJS.enc.Utf8.parse('5171061885171061');
    let _iv = CryptoJS.enc.Utf8.parse('5171061885171061');

    return CryptoJS.AES.decrypt(cipherText, _key,
      {
        keySize: 128 / 8,
        iv: _iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }).toString(CryptoJS.enc.Utf8);
  }

  encryptAES_HEX(plainText: string): string {
    let _key = CryptoJS.enc.Utf8.parse('5171061885171061');
    let _iv = CryptoJS.enc.Utf8.parse('5171061885171061');
    return CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(plainText), _key,
      {
        keySize: 128 / 8,
        iv: _iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }).toString(CryptoJS.format.Hex).toUpperCase();
  }

  decryptAES_HEX(cipherText: string): string {
    let _key = CryptoJS.enc.Utf8.parse('5171061885171061');
    let _iv = CryptoJS.enc.Utf8.parse('5171061885171061');

    const encryptedHex = CryptoJS.enc.Hex.parse(cipherText);
    const encryptedBase64 = CryptoJS.enc.Base64.stringify(encryptedHex);
    return CryptoJS.AES.decrypt(encryptedBase64, _key,
      {
        keySize: 128 / 8,
        iv: _iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }).toString(CryptoJS.enc.Utf8);
  }
}
