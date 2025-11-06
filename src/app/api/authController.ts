  import { LoginSchema, RegisterSchema, createSession, SESSION_COOKIE_NAME, } from "@/app/lib/auth";
  import { loginService, registerService } from "@/app/services/authService";
  import { ZodError } from "zod";
  
  async function handleApiError(error: unknown) {
    if (error instanceof ZodError) {
      return new Response(JSON.stringify({ error: error.issues[0].message }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (error instanceof Error) {
      const status = error.message.includes("finnes allerede") ? 409 : 401;
      return new Response(JSON.stringify({ error: error.message }), {
        status: status,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify({ error: "En ukjent feil oppstod" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
  
  export async function loginHandler(request: Request) {
    try {
      const body = await request.json();
      const data = LoginSchema.parse(body);
      const user = await loginService(data);
  
      const sessionId = await createSession(user.id);
  
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append(
        "Set-Cookie",
        `${SESSION_COOKIE_NAME}=${sessionId}; HttpOnly; Path=/; Max-Age=604800; SameSite=Lax`
      );
  
      return new Response(JSON.stringify({ success: true, userId: user.id }), {
        status: 200,
        headers: headers,
      });
    } catch (error) {
      return handleApiError(error);
    }
  }
  
  export async function registerHandler(request: Request) {
    try {
      const body = await request.json();
      const data = RegisterSchema.parse(body);
      const user = await registerService(data);
  
      const sessionId = await createSession(user.id);
  
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append(
        "Set-Cookie",
        `${SESSION_COOKIE_NAME}=${sessionId}; HttpOnly; Path=/; Max-Age=604800; SameSite=Lax`
      );
  
      return new Response(
        JSON.stringify({ success: true, userId: user.id }),
        {
          status: 201,
          headers: headers,
        }
      );
    } catch (error) {
      return handleApiError(error);
    }
  }