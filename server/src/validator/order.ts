import { validateStatus, validateStoreID, validatePay, validateID } from './base';
export class OrderValidator {
    public create() {
        return [validateStatus(), validateStoreID(), validatePay()];
    }
    public delete() {
        return [validateID()];
      }
}