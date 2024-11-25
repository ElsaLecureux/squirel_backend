import * as bcrypt from 'bcrypt';

export async function setPassword(password: string): Promise<string> {
  const saltOrRounds = 12;
  const hashedPassword = await bcrypt.hash(password, saltOrRounds);
  return hashedPassword;
}

export async function validatePassword(password: string, userPassword: string): Promise<boolean> {
  const res = await bcrypt.compare(password, userPassword);
  return res;
}
