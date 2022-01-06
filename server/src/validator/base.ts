import { check, body, CustomValidator } from 'express-validator';
import { errorMsg, errorStatusCode } from '../bases/errorTypes';
import ErrorHandler from '../controller/error.controller';

export const validateName = () => check('name')
  .isString()
  .notEmpty()
  .custom((value, { req }) => {
    if (!req.file) {
      return false;
    }
    return true;
  });

export const validateType = () => check('type').isInt({ min: 0, max: 1 }).notEmpty();

export const validateStatus = () => check('status').isInt({ min: 0, max: 1 }).notEmpty();

export const validateID = () => check('id').isInt().notEmpty();

export const validateStoreID = () => check('storeId').isInt().notEmpty();

export const validateUsername = () => check('username').isString().isLength({ min: 5, max: 15 }).notEmpty();

export const validatePassword = () => check('password').isString().isLength({ min: 5, max: 15 }).notEmpty();

export const validatePay = () => check('pay').isInt({ min: 0, max: 1 }).notEmpty();