// ./src/app/api/auth/[auth]/route.js

import { handleAuth } from '@auth0/nextjs-auth0';



export const GET = handleAuth(async (req, res) => {
  console.log("=====in route.js")
});


// export default handleAuth({
//   async login(req, res) {
//   await handleLogin(req, res, {
//   returnTo: "/dashboard,
//   });
//   console.log(‘RES:’,res)
//   },
//   });