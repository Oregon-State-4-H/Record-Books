import Navbar from './components/Navbar'
import { getSession } from "@auth0/nextjs-auth0";


export default async function Home() {
  const session = await getSession();
  let isAuth = false;

  if (session?.user) {
    isAuth = true;
  }

  console.log(session);

  return (
    <>
      <Navbar isBasic={true} isAuth={isAuth} />
      <main>
        <h1>Pubic Start Site</h1>
      </main>
    </>
  )
}