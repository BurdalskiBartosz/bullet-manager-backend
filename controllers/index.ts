import { Controller } from '../types';
import AuthorizationController from './authorization/authorization.controller';
import TaskController from './task/task.controller';
import NoteController from './note/note.controller';

const controllers: Controller[] = [new AuthorizationController(), new TaskController(), new NoteController()];

export default controllers;
