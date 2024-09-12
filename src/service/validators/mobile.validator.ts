import { PaymentDto } from "../dtos/payment.dto";
import { Validator } from "../interfaces/validator.interface";

export class MobliePaymentValidator implements Validator{
    isValid(payload: PaymentDto): boolean {
        if(!('mobileNumber' in payload)) return false;

        const regex = /^0(11|12|15)[0-9]{8}$/;
        
        return regex.test(payload.mobileNumber);
    }
}