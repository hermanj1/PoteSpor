import { defineApp } from "rwsdk/worker";
import { render, route } from "rwsdk/router";
import { Document } from "@/app/Document";
import { MapPage } from "./app/pages/MapPage";
import LoginPage from "./app/pages/LoginPage";
import { RegisterPage } from "./app/pages/RegisterPage";
import Home from "./app/pages/Home";
import NewReportPage from "./app/pages/NewReportPage";
import { loginHandler, registerHandler } from "./app/api/authController";
import type { Env } from "@/db"; 
import { publicRoute, protectedRoute, authRoute } from "@/app/lib/routeHelpers";

type Context = {
  request: Request;
  env: Env;
};

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
    route("/", (ctx) => publicRoute(ctx, Home)),

    route("/ny-annonse", (ctx) => protectedRoute(ctx, NewReportPage)),

    route("/kart", (ctx) => publicRoute(ctx, MapPage)),

    route("/savnet", (ctx) => publicRoute(ctx, () => <h1>Savnet</h1>)),

    route("/funnet", (ctx) => publicRoute(ctx, () => <h1>Funnet</h1>)),

    route("/gjenforent", (ctx) => publicRoute(ctx, () => <h1>Gjenforent</h1>)),

    route("/min-side", (ctx) => protectedRoute(ctx, () => <h1>Min side</h1>)),

    route("/login", (ctx) => authRoute(ctx, LoginPage)),

    route("/register", (ctx) => authRoute(ctx, RegisterPage)),  
]),
]);
