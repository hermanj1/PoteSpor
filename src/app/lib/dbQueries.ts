import { reports } from "@/db/schema/reports";
import { desc, eq } from "drizzle-orm";
import type { DbClient } from "@/db";

export async function getLatestReports(db: DbClient) {
  return await db
    .select()
    .from(reports)
    .orderBy(desc(reports.createdAt))
    .limit(20);
}

export async function getReportsByStatus(db: DbClient, status: string) {
  return await db
    .select()
    .from(reports)
    .where(eq(reports.status, status))
    .orderBy(desc(reports.createdAt));
}