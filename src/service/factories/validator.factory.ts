import { ServiceType } from "../entities/service.entity";
import { Validator } from "../interfaces/validator.interface";
import { DonationPaymentValidator } from "../validators/donation.validator";
import { InternetPaymentValidator } from "../validators/internet.validator";
import { LandLinePaymentValidator } from "../validators/landline.validator";
import { MobliePaymentValidator } from "../validators/mobile.validator";

export class ValidatorFactory{
    public static validatorFactory(serviceType:ServiceType):Validator
    {
        switch (serviceType) {
            case ServiceType.mobileRecharge:
                return new MobliePaymentValidator(); 
            case ServiceType.internetPayment:
                return new InternetPaymentValidator();
            case ServiceType.donation:
                return new DonationPaymentValidator();
            case ServiceType.landline:
                return new LandLinePaymentValidator();
            default:
                break;
        }
    }
}