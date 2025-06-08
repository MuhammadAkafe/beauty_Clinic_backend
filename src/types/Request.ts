import { Items } from "../entity/Items";

export interface RegisterRequestBody {
    username: string;
    email: string;
    password: string;
    confirm_password: string;
}

export interface LoginRequestBody {
    email: string;
    password: string;
}



export interface AddServiceRequestBody {
    title: string;
    sub_title: string;
    status: string;
    items: Items[];
}

export interface UpdateServiceRequest {
    service_id: number;
    title: string;
    sub_title: string;
    items: Items[];
    status: string;
}

export interface PathParams {
    user_id?: number;
    service_id?: number;
    item_id?: number;
}