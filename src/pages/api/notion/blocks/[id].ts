import type { APIRoute } from "astro";
import { TOKEN } from "@/config";

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  const id = params.id;
  if (!id || typeof id !== "string") {
    return new Response(JSON.stringify({ error: "Missing id" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const response = await fetch(
    `https://api.notion.com/v1/blocks/${id}/children?page_size=100`,
    {
      headers: {
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );
  const data: unknown = await response.json();

  return new Response(JSON.stringify(data), {
    status: response.ok ? 200 : response.status,
    headers: { "Content-Type": "application/json" },
  });
};
