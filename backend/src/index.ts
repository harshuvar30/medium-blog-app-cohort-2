import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import { signUpInput } from "@noob_coder/medium-common";
type Bindings = {
  DATABASE_URL: string;
  JWT_SECRET: string;
};

type Variables = {
  userId: string;
};

type JWTPayload = {
  id: string;
};

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>();

app.use("/api/v1/blog/*", async (c, next) => {
  const jwt = c.req.header("Authorization");
  if (!jwt) {
    c.status(403);
    return c.json({ error: "You are not logged in!" });
  }
  const token = jwt.split(" ")[1];
  try {
    const payload = (await verify(token, c.env.JWT_SECRET)) as JWTPayload;
    if (!payload) {
      c.status(403);
      return c.json({ error: "You are not logged in!" });
    }
    //tsIgnore
    c.set("userId", payload.id);
    await next();
  } catch (error) {
    c.status(403);
    return c.json({ error: "You are not logged in!" });
  }
});
app.get("/api/v1/get-user", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  // const body = await c.req.json()
  // console.log("checking body values",body)
  const user = await prisma.user.findMany({});
  return c.json(user);
});
app.post("/api/v1/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signUpInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ message: "inputs are not correct!" });
  }
  try {
    const user = await prisma.user.create({
      data: {
        email: body.username,
        password: body.password,
      },
    });
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ message: "Sign-Up succesfull!", token: jwt });
  } catch (e) {
    c.status(403);
    return c.json({ error: "error while signing up" });
  }
});
app.post("/api/v1/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password,
    },
  });

  if (!user) {
    c.status(403);
    return c.json({ error: "user not found" });
  }

  const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
  return c.json({ message: "Login successfull", token: jwt });
});

app.post("/api/v1/blog", async (c) => {
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  

  const body = await c.req.json();
  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: userId,
    },
  });
  return c.json({
    id: post.id,
  });
});
app.put("/api/v1/blog", async (c) => {
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  prisma.post.update({
    where: {
      id: body.id,
      authorId: userId,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });

  return c.text("updated post");
});
app.get("/api/v1/blog/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  });

  return c.json(post);
});
app.get("/api/v1/blog", async (c) => {
  // const id = c.req.param('id');
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const post = await prisma.post.findMany({
    where: {},
  });

  return c.json(post);
});

export default app;
