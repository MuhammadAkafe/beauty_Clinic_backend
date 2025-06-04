import { Services } from "../entity/Service";

export interface create_user_response {
    message: string;
    success: boolean;
    accessToken?: string;
}

export interface AddServiceResponse {
    message: string;
    success: boolean;
    service?: Services;
}

export interface GetAllServicesResponse {
    message: string;
    success: boolean;
    services?: Services[];
}

export interface DeleteServiceResponse {
    message: string;
    success: boolean;
}

export interface UpdateServiceResponse {
    message: string;
    success: boolean;
}