/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run "npm run dev" in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run "npm run deploy" to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
import {onRequestPost} from './users/[name]/inbox.js'


export default {
  async fetch(request, env, ctx) {
    // You can view your logs in the Observability dashboard
    console.info({ message: 'Hello World Worker received a request!' }); 
    const url = new URL(request.url);
    if(new RegExp(/users\/blog\/inbox/).test(url.pathname)){
      onRequestPost(ctx)
    } else if(new RegExp(/users\/blog\/outbox/).test(url.pathname)){
        const res = await fetch("/users/blog/outbox/index.json");
        return res;
    } else if(new RegExp(/users\/blog/).test(url.pathname)){
        const res = await fetch("/users/blog/index.json");
        return res;
    } else if (new RegExp(/hello/).test(url.pathname)){
        return new Response("Hello World!", { status: 200 });
    }
  }
};