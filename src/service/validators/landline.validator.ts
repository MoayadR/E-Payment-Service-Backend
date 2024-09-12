import { PaymentDto } from "../dtos/payment.dto";
import { Validator } from "../interfaces/validator.interface";

export class LandLinePaymentValidator implements Validator{
    isValid(payload: PaymentDto): boolean {
        if(!('landlineNumber' in payload)) return false;

        const regex = /^[0-9]{10}$/;
        return regex.test(payload.landlineNumber);
    }
}