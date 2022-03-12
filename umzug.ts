import { Umzug, SequelizeStorage } from 'umzug';
import { sequelize } from './src/sequelize';

export const migrator = new Umzug({
	migrations: {
		glob: ['migrations/*.ts', { cwd: __dirname }],
	},
	context: sequelize,
	storage: new SequelizeStorage({
		sequelize,
		modelName: 'migration_meta',
	}),
	logger: console,
});

export type Migration = typeof migrator._types.migration;

export const seeder = new Umzug({
	migrations: {
		glob: ['seeders/*.ts', { cwd: __dirname }],
	},
	context: sequelize,
	storage: new SequelizeStorage({
		sequelize,
		modelName: 'seeder_meta',
	}),
	logger: console,
});

export type Seeder = typeof seeder._types.migration;