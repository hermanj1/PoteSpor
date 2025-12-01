import { getDb, type Env } from "@/db";
import { getSessionUser } from "@/app/lib/auth";
import { MainLayout } from "@/app/layouts/Layout";

type Context = {
  request: Request;
  env: Env;
};

async function getUser(ctx: unknown) {
  const context = ctx as Context;
  return await getSessionUser(getDb(context.env), context.request);
}

export async function publicRoute(ctx: unknown, Component: React.FC<any>) {
  const user = await getUser(ctx);
  return (
    <MainLayout user={user}>
      <Component />
    </MainLayout>
  );
}

export async function protectedRoute(ctx: unknown, Component: React.FC<any>) {
  const user = await getUser(ctx);

  if (!user) {
    return new Response(null, { 
        status: 302, 
        headers: { Location: "/login" } 
    });
  }

  return (
    <MainLayout user={user}>
      <Component user={user} />
    </MainLayout>
  );
}

export async function authRoute(ctx: unknown, Component: React.FC<any>) {
    const user = await getUser(ctx);
  
    if (user) {
      return new Response(null, { 
          status: 302, 
          headers: { Location: "/min-side" } 
      });
    }
  
    return (
      <MainLayout user={user}>
        <Component />
      </MainLayout>
    );
  }