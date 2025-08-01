import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { storage } from './storage';

const JWT_SECRET = process.env.JWT_SECRET || 'portfolio-secret-key-2025';

export interface AuthRequest extends Request {
  user?: {
    id: number;
    username: string;
    isAdmin: boolean;
  };
}

// Hash password
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
};

// Verify password
export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

// Generate JWT token
export const generateToken = (user: { id: number; username: string; isAdmin: boolean }): string => {
  return jwt.sign(
    { 
      id: user.id, 
      username: user.username, 
      isAdmin: user.isAdmin 
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
};

// Verify JWT token
export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

// Authentication middleware
export const authenticateToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Token de acesso requerido' });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(403).json({ error: 'Token inválido ou expirado' });
  }

  // Get user from database
  const user = await storage.getUser(decoded.id);
  if (!user) {
    return res.status(403).json({ error: 'Usuário não encontrado' });
  }

  req.user = {
    id: user.id,
    username: user.username,
    isAdmin: user.isAdmin || false
  };

  next();
};

// Admin middleware
export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user?.isAdmin) {
    return res.status(403).json({ error: 'Acesso negado. Permissões de administrador necessárias.' });
  }
  next();
};

// Login function
export const loginUser = async (username: string, password: string) => {
  const user = await storage.getUserByUsername(username);
  if (!user) {
    throw new Error('Credenciais inválidas');
  }

  const isPasswordValid = await verifyPassword(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Credenciais inválidas');
  }

  const token = generateToken({
    id: user.id,
    username: user.username,
    isAdmin: user.isAdmin || false
  });

  return {
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isAdmin: user.isAdmin || false
    }
  };
};