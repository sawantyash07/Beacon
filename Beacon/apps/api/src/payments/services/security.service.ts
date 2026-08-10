import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class SecurityService {
  private readonly algorithm = 'aes-256-cbc';
  private readonly key: Buffer;

  constructor() {
    // Standard key derivation from JWT_SECRET or fallback key
    const secret = process.env.JWT_SECRET || 'fallback_secret_for_aes_encryption_key_32_bytes_long';
    // Ensure the key is exactly 32 bytes
    this.key = crypto.createHash('sha256').update(secret).digest();
  }

  encrypt(text: string): string {
    if (!text) return '';
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted}`;
  }

  decrypt(encryptedText: string): string {
    if (!encryptedText) return '';
    try {
      const parts = encryptedText.split(':');
      if (parts.length !== 2) return '';
      const iv = Buffer.from(parts[0], 'hex');
      const encrypted = parts[1];
      const decipher = crypto.createDecipheriv(this.algorithm, this.key, iv);
      let decrypted = decipher.update(encrypted, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      return decrypted;
    } catch (error) {
      console.error('Failed to decrypt payment credentials', error);
      return '';
    }
  }

  verifyBasicAuth(authHeader: string, expectedUser: string, expectedPassDecrypted: string): boolean {
    if (!authHeader || !authHeader.startsWith('Basic ')) {
      return false;
    }
    try {
      const base64Credentials = authHeader.substring(6);
      const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
      const parts = credentials.split(':');
      if (parts.length !== 2) return false;

      const [username, password] = parts;
      return username === expectedUser && password === expectedPassDecrypted;
    } catch (e) {
      return false;
    }
  }
}
