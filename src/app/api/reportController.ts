import { getDb, type Env } from "@/db";
import { reports } from "@/db/schema/reports";
import { getSessionUser } from "@/app/lib/auth"; 
import { CreateReportSchema } from "@/app/lib/validation";
import { ZodError } from "zod";

export async function createReportHandler(request: Request, env: Env) {
  try {
    const db = getDb(env);
    const user = await getSessionUser(db, request);
    
    if (!user) return new Response(JSON.stringify({ error: "Logg inn først" }), { status: 401 });

    const body = await request.json();
    const data = CreateReportSchema.parse(body);

    const [newReport] = await db.insert(reports).values({
      userId: user.id, 
      ...data, 
    }).returning();

    return new Response(JSON.stringify({ success: true, reportId: newReport.id }), { status: 201 });

  } catch (error) {
    if (error instanceof ZodError) return new Response(JSON.stringify({ error: error.issues[0].message }), { status: 400 });
    console.error(error);
    return new Response(JSON.stringify({ error: "Feil ved lagring" }), { status: 500 });
  }
}