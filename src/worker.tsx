import { defineApp } from "rwsdk/worker";
import { render, route } from "rwsdk/router";
import { Document } from "@/app/Document";
import { MainLayout } from "@/app/layouts/Layout";
import { setCommonHeaders } from "./app/headers";
import { MapPage } from "./app/pages/MapPage";
import LoginPage from "./app/pages/LoginPage";
import { RegisterPage } from "./app/pages/RegisterPage";
import { loginHandler, registerHandler } from "./app/api/authController";

export default defineApp([
  setCommonHeaders(),

  route("/api/login", async ({ request }) => {
    if (request.method === "POST") {
      return loginHandler(request);
    }
    return new Response("Method Not Allowed", { status: 405 });
  }),
  
  route("/api/register", async ({ request }) => {
    if (request.method === "POST") {
      return registerHandler(request);
    }
    return new Response("Method Not Allowed", { status: 405 });
  }),

  render(Document, [
    route("/", () => (
      <MainLayout>
        <h1>Hjemmeside</h1>
      </MainLayout>
    )),

    route("/ny-annonse", () => (
      <MainLayout>
        <h1>Ny annonse</h1>
      </MainLayout>
    )),

    route("/kart", () => (
      <MainLayout>
        <h1>Kart</h1>
        <MapPage />
      </MainLayout>
    )),
    route("/savnet", () => (
      <MainLayout>
        <h1>Savnet</h1>
      </MainLayout>
    )),

    route("/funnet", () => (
      <MainLayout>
        <h1>Funnet</h1>
      </MainLayout>
    )),
    
    route("/gjenforent", () => (
      <MainLayout>
        <h1>Gjenforent</h1>
      </MainLayout>
    )),

    route("/min-side", () => (
      <MainLayout>
        <h1>Min side</h1>
      </MainLayout>
    )),

    route("/login", () => (
        <MainLayout>
            <LoginPage />
        </MainLayout>
    )),
    
    route("/register", () => (
        <MainLayout>
            <RegisterPage />
        </MainLayout>
    )),

  ]),
]);