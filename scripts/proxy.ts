import { Elysia } from "elysia"
import { cors } from "@elysiajs/cors"

const xSetUrl = "X-Set-Url"
const xSetHeaders = "X-Set-Headers"

new Elysia()
    .use(cors())
    .get("/", async context => {
        // return new Response(undefined, { status: 418 })
        try {
            const req = context.request
            const url = req.headers.get(xSetUrl)!
            const xForbiddenHeaders = JSON.parse(req.headers.get(xSetHeaders))
            req.headers.delete(xSetUrl)
            req.headers.delete(xSetHeaders)

            req.headers.delete("host")
            if (xForbiddenHeaders) {
                for (const [k, v] of Object.entries(xForbiddenHeaders)) {
                    if (v === null) {
                        req.headers.delete(k)
                    } else {
                        req.headers.set(k, v)
                    }
                }
            }

            const res = await fetch(url, req)

            for (const h of ["Access-Control-Allow-Origin", "Content-Encoding", "Date"]) {
                res.headers.delete(h)
            }

            return res
        } catch (e) {
            console.error(e)
            throw e
        }
    })
    .listen(3000)
