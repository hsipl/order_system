import { check, body } from 'express-validator';
import {
  validateID,
  validateName,
  validateStatus,
  validateType,
  validateStoreID,
  validateUsername,
  validatePassword,
  validateImage
} from './base';

export class UserValidator {
  public register() {
    return [
      validateUsername(),
      validatePassword(),
      validateType(),
      validateName(),
      validateStoreID(),
      validateImage(),
    ];
  }

  public login() {
    return [validateUsername(), validatePassword()];
  }
}
