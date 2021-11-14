import { Controller } from '../types';
import UsersController from './user/user.controller';

const controllers: Controller[] = [new UsersController()];

export default controllers;
