import { defineApp } from "rwsdk/worker";
import { render, route } from "rwsdk/router";
import { Document } from "@/app/Document";
import { MapPage } from "./app/pages/MapPage";
import LoginPage from "./app/pages/LoginPage";
import { RegisterPage } from "./app/pages/RegisterPage";
import Home from "./app/pages/Home";
import { MyPage } from "./app/pages/MyPage";
import NewReportPage from "./app/pages/NewReportPage";
import { loginHandler, registerHandler, logoutHandler } from "./app/api/authController";
import { createReportHandler } from "./app/api/reportController";
import type { Env } from "@/db"; 
import { getDb } from "@/db"; 
import { getLatestReports, getReportsByStatus, getAllReportsWithCoordinates } from "@/app/lib/dbQueries"; 
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

  route("/api/logout", async (ctx) => {
    const { request } = ctx as unknown as Context;
    if (request.method === "POST") return logoutHandler(request);
    return new Response("Method Not Allowed", { status: 405 });
  }),

  route("/api/reports", async (ctx) => {
    const { request, env } = ctx as unknown as Context;
    if (request.method === "POST") return createReportHandler(request, env);
    return new Response("Method Not Allowed", { status: 405 });
  }),

  render(Document, [
    
    route("/", async (ctx: any) => {
      const db = getDb(ctx.env);
      const reports = await getLatestReports(db); 
      
      return publicRoute(ctx, () => <Home reports={reports} />);
    }),

    route("/ny-annonse", (ctx: any) => protectedRoute(ctx, NewReportPage)),

    route("/kart", async (ctx: any) => {
      const db = getDb(ctx.env);
      const reports = await getAllReportsWithCoordinates(db);

      return publicRoute(ctx, () => <MapPage reports={reports} />);
    }),

    route("/savnet", async (ctx: any) => {
      const db = getDb(ctx.env);
      const reports = await getReportsByStatus(db, "savnet");
      
      return publicRoute(ctx, () => <Home title="savnet" reports={reports} />);
    }),

    route("/funnet", async (ctx: any) => {
      const db = getDb(ctx.env);
      const reports = await getReportsByStatus(db, "funnet");
      
      return publicRoute(ctx, () => <Home title="funnet" reports={reports} />);
    }),

    route("/gjenforent", async (ctx: any) => {
      const db = getDb(ctx.env);
      const reports = await getReportsByStatus(db, "gjenforent");
      
      return publicRoute(ctx, () => <Home title="gjenforent" reports={reports} />);
    }),

    route("/min-side", (ctx: any) => protectedRoute(ctx, MyPage)),

    route("/login", (ctx: any) => authRoute(ctx, LoginPage)),

    route("/register", (ctx: any) => authRoute(ctx, RegisterPage)),  
]),
]);
