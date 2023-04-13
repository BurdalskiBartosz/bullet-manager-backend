import { PrismaClient } from '@prisma/client';

class DbService extends PrismaClient {}

const dbService = new DbService();

export default dbService;
