import express from 'express';
import { createGrowth, createNutritionPlan, deleteNutrition, getGrowth, getNutriByBaby, getNutriByPediatrician, updatePushToken } from '../controllers/nitriplan.controller';

const routes = express();

routes.post('/nutrition', createNutritionPlan);
routes.get('/nutrition', getNutriByBaby);
routes.delete('/nutrition', deleteNutrition);
routes.patch('/notification', updatePushToken);
routes.get('/nutrition-ped', getNutriByPediatrician);
routes.post('/growth', createGrowth);
routes.get('/growth', getGrowth);

const nutriRoutes = routes;

export default nutriRoutes;
