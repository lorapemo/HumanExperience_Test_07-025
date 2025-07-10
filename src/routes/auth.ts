import { Router } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';
import { AuthService } from '../utils/auth';

const router = Router();
const userRepository = AppDataSource.getRepository(User);

// Register new user /auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all fields' });
    }

    const existingUser = await userRepository.findOneBy({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await AuthService.hashPassword(password);
    const user = userRepository.create({
      name,
      email,
      password: hashedPassword
    });

    await userRepository.save(user);

    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json({
      user: userWithoutPassword,
      token: AuthService.generateToken(user)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login user /auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userRepository.findOneBy({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials, email not found' });
    }

    const isMatch = await AuthService.comparePasswords(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      user: userWithoutPassword,
      token: AuthService.generateToken(user)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;