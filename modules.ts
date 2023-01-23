import UserModule from './components/User/UserModule';
import TaskModule from './components/Task/TaskModule';
import TokenModule from './components/Token/TokenModule';
import AuthModule from './components/Auth/AuthModule';
import UserTaskModule from './components/UserTask/UserTaskModule';
import CategoryModule from './components/Category/CategoryModule';
import { Module } from './types/components/module';
import { iClassGenericContructor } from './types/class';

export const modules: iClassGenericContructor<Module>[] = [
	AuthModule,
	UserModule,
	TaskModule,
	TokenModule,
	UserTaskModule,
	CategoryModule
];
