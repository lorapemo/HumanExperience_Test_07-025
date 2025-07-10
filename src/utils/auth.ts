import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../entities/User';

// Type-safe environment configuration
const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = Number(process.env.JWT_EXPIRES_IN) ;

// Runtime validation
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

export class AuthService {
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  static async comparePasswords(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  static generateToken(user: User): string {
    const payload = { 
      id: user.id, 
      email: user.email 
    };

    const options: jwt.SignOptions = {
      expiresIn: JWT_EXPIRES_IN
    };

    return jwt.sign(
      payload,
      JWT_SECRET,
      options
    );
  }

  static verifyToken(token: string): string | jwt.JwtPayload {
    return jwt.verify(token, JWT_SECRET);
  }
}