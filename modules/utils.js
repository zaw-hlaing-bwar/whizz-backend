import crypto from 'crypto';

export const encrypt = (key, data) => {
  const cipher = crypto.createCipher('aes-256-cbc', key);
  let crypted = cipher.update(data, 'utf-8', 'hex');
  crypted += cipher.final('hex');

  return crypted;
}

export const decrypt = (key, data) => {
  const decipher = crypto.createDecipher('aes-256-cbc', key);
  let decrypted = decipher.update(data, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');

  return decrypted;
}
