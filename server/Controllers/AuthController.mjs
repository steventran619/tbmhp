import { createSecretToken } from '../util/SecretToken.mjs';
import bcrypt from 'bcrypt';

export async function Signup(User, req, res, next) {
  try {
    const { email, password, username, adminPassword } = req.body;

    if (!(email && password && username && adminPassword)) {
        return res.json({message: "Missing Required Field"});
    }
    // Admin password check
    if (adminPassword != process.env.ADMIN_PASSWORD) {
      return res.json({message: "Incorrect Admin Password"});
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({ message: "User already exists" }); // Conflict
    }

    const user = await User.create({ email, password, username });
    
    // Expires in 3 days
    const jwtExpireTime = 3 * 24 * 60 * 60;
    const token = createSecretToken({id: user._id}, jwtExpireTime);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    res.status(201).json({ message: "User signed in successfully", success: true, user }); // Created

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" }); // Internal Server Error
  }
}

export async function Login(User, req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ message: 'All fields are required' }); // Bad Request
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ message: 'Incorrect password or email' }); // Unauthorized
    }

    const auth = await bcrypt.compare(password, user.password);

    if (!auth) {
      return res.json({ message: 'Incorrect password or email' }); // Unauthorized
    }

    // Expires in 3 days
    const jwtExpireTime = 3 * 24 * 60 * 60;
    const token = createSecretToken({id: user._id}, jwtExpireTime);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    res.status(200).json({ message: "User logged in successfully", success: true }); // OK

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" }); // Internal Server Error
  }
}