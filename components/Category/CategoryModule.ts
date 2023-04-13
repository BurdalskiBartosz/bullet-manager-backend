import { Module } from '../../types/components/module';
import CategoryController from './CategoryController';
import CategoryService from './CategoryService';

class CategoryModule implements Module {
	init() {
		const controller = new CategoryController(CategoryService);
		return controller;
	}
}

export default CategoryModule;
