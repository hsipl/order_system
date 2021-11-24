import { check, body } from 'express-validator';
import {
  validateID,
  validateName,
  validateStatus,
  validateType,
  validateStoreID,
  validateUsername,
  validatePassword,
} from './base';

export class UserValidator {
  public register() {
    return [
      validateUsername(),
      validatePassword(),
      validateStatus(),
      validateType(),
      validateName(),
      validateStoreID(),
    ];
  }

  public login() {
    return [validateUsername(), validatePassword()];
  }
}
