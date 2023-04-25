import UserModule from './components/User/UserModule';
import TokenModule from './components/Token/TokenModule';
import AuthModule from './components/Auth/AuthModule';
import UserTaskModule from './components/UserTask/UserTaskModule';
import CategoryModule from './components/Category/CategoryModule';
import { Module } from './types/components/module';
import { Contructor } from './types/class';

export const modules: Contructor<Module>[] = [
	AuthModule,
	UserModule,
	TokenModule,
	UserTaskModule,
	CategoryModule
];
