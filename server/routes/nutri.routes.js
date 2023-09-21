import express from 'express';
import { createNutritionPlan, deleteNutrition, getNutriByBaby, getNutriByPediatrician, updatePushToken } from '../controllers/nitriplan.controller';

const routes = express();

routes.post('/nutrition', createNutritionPlan);
routes.get('/nutrition', getNutriByBaby);
routes.delete('/nutrition', deleteNutrition);
routes.patch('/notification', updatePushToken);
routes.get('/nutrition-ped', getNutriByPediatrician);

const nutriRoutes = routes;

export default nutriRoutes;
