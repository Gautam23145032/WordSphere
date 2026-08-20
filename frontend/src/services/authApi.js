    import axiosInstance from "./axiosInstance";

    export async function register(userData) {
    const response = await axiosInstance.post(
        "/api/auth/register",
        userData
    );

    return response.data;
    }

    export async function login(userData) {
    const response = await axiosInstance.post(
        "/api/auth/login",
        userData
    );

    return response.data;
    }

    export async function getProfile() {
    const response = await axiosInstance.get(
        "/api/auth/profile"
    );

    return response.data;
    }