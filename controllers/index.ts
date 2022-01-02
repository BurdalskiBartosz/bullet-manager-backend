import { Controller } from '../types';
import AuthorizationController from './authorization/authorization.controller';
import TaskController from './task/task.controller';
import NoteController from './note/note.controller';
import ScheduleController from './schedule/schedule.controller';
import CounterController from './counter/counter.controller';
import BookController from './book/book.controller';

const controllers: Controller[] = [
	new AuthorizationController(),
	new TaskController(),
	new NoteController(),
	new ScheduleController(),
	new CounterController(),
	new BookController()
];

export default controllers;
