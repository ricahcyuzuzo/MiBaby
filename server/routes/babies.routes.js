import express from 'express';
import { createBaby, getBabies, getBabiesMother } from '../controllers/baby.controller';

const routes = express();

routes.post('/baby', createBaby);
routes.get('/babies', getBabies);
routes.get('/babies_mother', getBabiesMother);

const babyRoutes = routes;

export default babyRoutes;
