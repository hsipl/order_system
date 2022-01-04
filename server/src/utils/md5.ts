import * as crpyto from 'crypto';

const SALT = 'hsipl';

export function encrypt(password: string): string {
  const md5 = crpyto.createHash('md5');
  const saltPassword = `${password}:${SALT}`;
  return md5.update(saltPassword).digest('hex');
}
