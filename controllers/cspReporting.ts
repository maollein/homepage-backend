import { Router } from 'express';

const cspReportingRouter = Router();

cspReportingRouter.post('/', (req, res) => {
  console.log(req);
  res.status(200).end();
});

export default cspReportingRouter;