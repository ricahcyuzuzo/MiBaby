import express from 'express';
import { createPediatrician, getMothers, getNumbers, getPediats } from '../controllers/admin.controller';

const routes = express();

routes.post('/pediat', createPediatrician);
routes.get('/pediat', getPediats);
routes.get('/mothers', getMothers);
routes.get('/numbers', getNumbers);

const adminRoutes = routes;

export default adminRoutes;
