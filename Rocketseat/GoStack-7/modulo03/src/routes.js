import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import authMiddleware from './app/middlewares/auth';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';

const routes = new Router();
const upload = multer(multerConfig);

// Create user
routes.post('/users', UserController.store);
// Create session token
routes.post('/sessions', SessionController.store);

// Global middleware
routes.use(authMiddleware);

// Update user
routes.put('/users', UserController.update);

// List providers
routes.get('/providers', ProviderController.index);

// List appointments
routes.get('/appointments', AppointmentController.index);
// Create appointment
routes.post('/appointments', AppointmentController.store);

// List schedules
routes.get('/schedule', ScheduleController.index);

// List notifications
routes.get('/notifications', NotificationController.index);
// Mark notifications as read
routes.put('/notifications/:id', NotificationController.update);

// Upload picture
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
