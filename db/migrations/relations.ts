import { relations } from "drizzle-orm/relations";
import { users, categories, projects, tasks } from "./schema";

export const categoriesRelations = relations(categories, ({one, many}) => ({
	user: one(users, {
		fields: [categories.userId],
		references: [users.id]
	}),
	tasks: many(tasks),
}));

export const usersRelations = relations(users, ({many}) => ({
	categories: many(categories),
	projects: many(projects),
	tasks: many(tasks),
}));

export const projectsRelations = relations(projects, ({one, many}) => ({
	user: one(users, {
		fields: [projects.userId],
		references: [users.id]
	}),
	tasks: many(tasks),
}));

export const tasksRelations = relations(tasks, ({one}) => ({
	user: one(users, {
		fields: [tasks.userId],
		references: [users.id]
	}),
	project: one(projects, {
		fields: [tasks.projectId],
		references: [projects.id]
	}),
	category: one(categories, {
		fields: [tasks.categoryId],
		references: [categories.id]
	}),
}));