import { defineApp } from "rwsdk/worker";
import { render, route } from "rwsdk/router";
import { Document } from "@/app/Document";
import { MainLayout } from "@/app/layouts/Layout";
import { MapPage } from "./app/pages/MapPage";
import LoginPage from "./app/pages/LoginPage";
import { RegisterPage } from "./app/pages/RegisterPage";
import Home from "./app/pages/Home";
import NewReportPage from "./app/pages/NewReportPage";

import { loginHandler, registerHandler } from "./app/api/authController";
import { getDb, type Env } from "@/db"; 
import { getSessionUser } from "@/app/lib/auth"; 

type Context = {
  request: Request;
  env: Env;
};

async function getUser(ctx: unknown) {
  const context = ctx as Context;
  const db = getDb(context.env);
  return await getSessionUser(db, context.request);
}

export default defineApp([
  
  route("/api/login", async (ctx) => {
    const { request, env } = ctx as unknown as Context;
    if (request.method === "POST") return loginHandler(request, env);
    return new Response("Method Not Allowed", { status: 405 });
  }),

  route("/api/register", async (ctx) => {
    const { request, env } = ctx as unknown as Context;
    if (request.method === "POST") return registerHandler(request, env);
    return new Response("Method Not Allowed", { status: 405 });
  }),

  render(Document, [
    route("/", async (ctx) => {
      const user = await getUser(ctx);
      return (
        <MainLayout user={user}>
          <Home />
        </MainLayout>
      );
    }),

    route("/ny-annonse", async (ctx) => {
      const user = await getUser(ctx);
      return (
        <MainLayout user={user}>
          <NewReportPage />
        </MainLayout>
      );
    }),

    route("/kart", async (ctx) => {
      const user = await getUser(ctx);
      return (
        <MainLayout user={user}>
          <h1>Kart</h1>
          <MapPage />
        </MainLayout>
      );
    }),

    route("/savnet", async (ctx) => {
      const user = await getUser(ctx);
      return (
        <MainLayout user={user}>
          <h1>Savnet</h1>
        </MainLayout>
      );
    }),

    route("/funnet", async (ctx) => {
      const user = await getUser(ctx);
      return (
        <MainLayout user={user}>
          <h1>Funnet</h1>
        </MainLayout>
      );
    }),

    route("/gjenforent", async (ctx) => {
      const user = await getUser(ctx);
      return (
        <MainLayout user={user}>
          <h1>Gjenforent</h1>
        </MainLayout>
      );
    }),

    route("/min-side", async (ctx) => {
      const user = await getUser(ctx);

      if (!user) {
        return new Response(null, { 
            status: 302, 
            headers: { Location: "/login" } 
        });
      }

      return (
        <MainLayout user={user}>
          <h1>Min side</h1>
        </MainLayout>
      );
    }),

    
    route("/login", async (ctx) => {
      const user = await getUser(ctx);

      if (user) {
        return new Response(null, { 
            status: 302, 
            headers: { Location: "/min-side" } 
        });
      }

      return (
        <MainLayout user={user}>
          <LoginPage />
        </MainLayout>
      );
    }),

    route("/register", async (ctx) => {
      const user = await getUser(ctx);

      if (user) {
        return new Response(null, { 
            status: 302, 
            headers: { Location: "/min-side" } 
        });
      }

      return (
        <MainLayout user={user}>
            <RegisterPage />
        </MainLayout>
      );
  }),  

]),
]);
