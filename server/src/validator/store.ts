import { check, body } from 'express-validator';
import {
  validateID, validateType, validateStatus, validateName,
} from './base';

export class StoreValidator {
  public create() {
    return [validateType(), validateName()];
  }

  public update() {
    return [validateID(), validateType(), validateStatus(), validateName()];
  }

  public getByID() {
    return [validateID()];
  }

  public delete() {
    return [validateID()];
  }
}
