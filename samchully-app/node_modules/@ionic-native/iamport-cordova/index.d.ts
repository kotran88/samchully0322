import { IonicNativePlugin } from '@ionic-native/core';
export interface PaymentObject {
    title?: TitleData;
    userCode: string;
    data: PaymentData;
    callback: any;
}
export interface CertificationObject {
    title?: TitleData;
    userCode: string;
    data: CertificationData;
    callback: any;
}
export interface TitleData {
    name?: string;
    color?: string;
}
export interface PaymentData {
    pg?: string;
    pay_method?: string;
    name: string;
    merchant_uid?: string;
    amount: string;
    buyer_name?: string;
    buyer_tel?: string;
    buyer_email?: string;
    buyer_addr?: string;
    buyer_postcode?: string;
    app_scheme: string;
    custom_data?: any;
    notice_url?: string;
    escrow?: boolean;
    digital?: boolean;
    display?: {
        card_quota?: number[];
    };
    currency?: string;
    customer_uid?: string;
    tax_free?: string;
    language?: string;
    vbank_due?: string;
    biz_num?: string;
}
export interface CertificationData {
    company?: string;
    phone?: string;
    name?: string;
    carrier?: string;
    birth?: string;
    merchant_uid?: string;
    min_age?: string;
    popup?: boolean;
}
/**
 * @name Iamport Cordova
 * @description
 * This plugin does something
 *
 * @usage
 * ```typescript
 * import { IamportCordova } from '@ionic-native/iamport-cordova/ngx';
 *
 *
 * constructor(private iamportCordova: IamportCordova) { }
 *
 * ...
 *
 *
 * this.iamportCordova.functionName('Hello', 123)
 *   .then((res: any) => console.log(res))
 *   .catch((error: any) => console.error(error));
 *
 * ```
 */
export declare class IamportCordovaOriginal extends IonicNativePlugin {
    /**
     * This function is to load a webview of a payment gateway to pay for something
     * @param paymentObject {PaymentObject} Payment data to set the payment webview
     * @return {Promise<any>} A callback function of the payment data is triggered when the webview is closed
     */
    payment(paymentObject: PaymentObject): Promise<any>;
    /**
     * This function is to load a webview for identification with carrier type(like Verizon), name and phone number
     * @param certificationObject {CertificationObject} Certification data to set the certification webview
     * @return {Promise<any>} A callback function of the certification data is triggered when the webview is closed
     */
    certification(certificationObject: CertificationObject): Promise<any>;
}

export declare const IamportCordova: IamportCordovaOriginal;