import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";

export async function POST() {
  // N.B.: Below fails to typecheck, possibly related to: https://github.com/drizzle-team/drizzle-orm/issues/2940
  // const records = await db.insert(advocates).values(advocateData).returning();

  // return Response.json({ advocates: records });
}
