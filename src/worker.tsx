import { defineApp } from "rwsdk/worker";
import { render, route } from "rwsdk/router";
import { Document } from "@/app/Document";
import { MainLayout } from "@/app/layouts/Layout";
import { setCommonHeaders } from "./app/headers";


export default defineApp([
  setCommonHeaders(),

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
            <h1>Login</h1>
        </MainLayout>
    )),
  ]),
]);