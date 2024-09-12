import { PaymentDto } from "../dtos/payment.dto";

export interface Validator{
    isValid(payload:PaymentDto):boolean;
}