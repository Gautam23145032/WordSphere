import axiosInstance from "./axiosInstance";

export async function getVapidPublicKey() {

    const response =
        await axiosInstance.get(
            "/api/notifications/vapid-public-key"
        );

    return response.data.publicKey;

}

export async function saveSubscription(
    subscription
){

    const response =
        await axiosInstance.post(

            "/api/notifications/subscribe",

            subscription

        );

    return response.data;

}