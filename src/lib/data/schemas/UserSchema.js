import { z } from 'zod';

const UserSchema = z.object({
  username: z
    .string()
    .min(4, 'Username must be at least 4 characters long.')
    .trim(),
  email: z.string().email('Email address is not valid.').trim(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long.')
    .regex(/[a-zA-Z]/, 'Must contain at least one letter.')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter.')
    .regex(/[0-9]/, 'Must contain at least one number.')
    .trim(),
  admin: z.boolean().optional(),
});

export default UserSchema;
