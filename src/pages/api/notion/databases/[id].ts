import type { APIRoute } from "astro";
import { DATABASE_ID } from "@/config";
import { getDatabase } from "@/controllers/notionController";

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  const id = params.id;
  if (!id || typeof id !== "string") {
    return new Response(JSON.stringify({ error: "Missing id" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const dbId = id === "cv_database" ? DATABASE_ID : id;
  const data = await getDatabase(dbId);

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
