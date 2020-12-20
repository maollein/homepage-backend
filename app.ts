import config from './config';
import express from 'express';
import 'express-async-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import blogRouter from './controllers/blog';
import loginRouter from './controllers/login';
import { errorHandler } from './middleware/errorHandler';
import loginTokenParser from './middleware/loginTokenParser';
import { defaultEndpoint, redirectHttpToHttps } from './middleware/utils';
import csurf from 'csurf';
import cspReportingRouter from './controllers/cspReporting';
import helmet from 'helmet';
import compression from 'compression';

const app = express();
app.disable("x-powered-by");
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'none'"],
      scriptSrc: ["'self'"],
      connectSrc: ["'self'"],
      imgSrc: ["'self'"],
      styleSrc: ["'self'"],
      scriptSrcAttr: ["'none'"],
      blockAllMixedContent: [],
      upgradeInsecureRequests: []
    }
  },
  hidePoweredBy: false
}));
app.use(redirectHttpToHttps);
app.use(cookieParser(config.COOKIE_SECRET));
app.use(express.json());

const csurfCookieOptions: csurf.CookieOptions = {
  signed: true,
  httpOnly: true
};

const csrfTokenOptions: csurf.CookieOptions = {
};

if (process.env.NODE_ENV !== 'development') {
  csurfCookieOptions.secure = true;
  csurfCookieOptions.sameSite = 'strict';
  csrfTokenOptions.secure = true;
  csrfTokenOptions.sameSite = 'strict';
}

app.use(csurf({ cookie: csurfCookieOptions }));

app.use(loginTokenParser);

app.use(compression({
  threshold: '5kb'
}));

app.use('/api/blog', blogRouter);
app.use('/api', loginRouter);
app.use('/api/cspreport', cspReportingRouter);

app.use(express.static(config.UI_BUILD_PATH, { index: false }));

app.get('*', (req, res) => {
  res.cookie('CSRF-TOKEN', req.csrfToken(), csrfTokenOptions);
  res.sendFile(path.join(config.UI_BUILD_PATH, '/index.html'));
});

app.use(errorHandler);
app.use(defaultEndpoint);

export default app;