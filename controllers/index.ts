import { Controller } from '../types';
import AuthorizationController from './authorization/authorization.controller';
import TaskController from './task/task.controller';

const controllers: Controller[] = [new AuthorizationController(), new TaskController()];

export default controllers;
