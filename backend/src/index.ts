import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from "hono/cors";
import appRoutes from '../routes/route'

const app = new Hono()

app.use(
  cors({
    origin: process.env.AUTHORIZE_URL || '*',
    credentials: true,
  })
);

appRoutes(app);

serve({
  fetch: app.fetch,
  port: 3030
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
