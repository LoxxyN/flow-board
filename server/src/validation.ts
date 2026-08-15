import { z } from "zod";

export const prioritySchema = z.enum(["low", "medium", "high"]);
export const statusSchema = z.enum(["todo", "in_progress", "done"]);

export const createTaskSchema = z.object({
  title: z.string().trim().min(4, "Title must be at least 4 characters"),
  description: z.string().trim().nullable().optional(),
  priority: prioritySchema.default("medium"),
  status: statusSchema.default("todo"),
});

export const updateTaskSchema = z.object({
  title: z.string().trim().min(4, "Title must be at least 4 characters").optional(),
  description: z.string().trim().nullable().optional(),
  priority: prioritySchema.optional(),
  status: statusSchema.optional(),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
