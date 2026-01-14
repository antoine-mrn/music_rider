import { instance } from "./http";

export async function getHello() {
    try {
        const response = await instance.get("/auth/profile");
        return response;
    } catch (error) {
        console.error("getHello failed:", error);
        throw error;
    }
}
