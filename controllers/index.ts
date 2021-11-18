import { Controller } from '../types';
import AuthorizationController from './authorization/authorization.controller';

const controllers: Controller[] = [new AuthorizationController()];

export default controllers;
