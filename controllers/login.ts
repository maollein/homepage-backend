import { Router } from 'express';
import bcrypt from 'bcrypt';
import { parseLoginInfo } from '../utils/parsers';
import { loginError } from '../utils/utils';
import { compareAndFail, getJWT, getLoginCookieOptions } from '../utils/loginUtils';
import userService from '../services/userService';

const loginRouter = Router();

loginRouter.post('/login', async (req, res) => {
  const loginInfo = parseLoginInfo(req.body);
  const user = await userService.getUserWithLoginCounter(loginInfo.username);

  // To mitigate username enumeration based on timing, 
  // we always compare passwords as if user account exists
  // and is not locked.
  if (!user || user.locked_until && new Date() < new Date(user.locked_until))
    return await compareAndFail();

  // To mitigate brute force password guessing,
  // lock account after 10 failed login attempts.
  const passwordMatch = await bcrypt.compare(loginInfo.password, user.password);
  if (!passwordMatch) {
    if (user.login_count < 9)
      await userService.updateLoginCounter('increment', user.id);
    else 
      await userService.updateLoginCounter('lock', user.id);
    throw loginError();
  } else {
    await userService.updateLoginCounter('reset', user.id);
  }

  const token = getJWT(user);
  const cookieOptions = getLoginCookieOptions();
  res.cookie('login', token, cookieOptions);
  return res.json({ username: user.username, name: user.name, id: user.id });
});

loginRouter.post('/logout', (_req, res) => {
  res.cookie('login', '', { maxAge: 0 });
  res.json({ response: 'Logged out' });
});

export default loginRouter;