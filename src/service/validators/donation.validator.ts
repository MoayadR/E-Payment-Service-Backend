import { PaymentDto } from "../dtos/payment.dto";
import { Validator } from "../interfaces/validator.interface";

export class DonationPaymentValidator implements Validator{
    isValid(payload: PaymentDto): boolean {
        return true;
    }
}