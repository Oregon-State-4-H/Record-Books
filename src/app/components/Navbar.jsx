// ./src/app/components/NavBar.jsx
import Link from 'next/link'
import { MdContentPaste, MdOutlineDescription, MdOutlineHome, MdOutlineAccountCircle } from "react-icons/md"

function NoAuthNavItems({pageName}){
  if (pageName == 'docs') {
    return (
      <>
        <Link href='/#what-is-record-books' className='navItem'>About</Link>
        <Link href='/#meet-the-team' className='navItem'>Meet the team</Link>
        <Link href='/#contact-us' className='navItem'>Contact Us</Link>
        <Link href='/docs' className='navItem'>Docs</Link>
      </>
    )
  } else {
    return (
      <>
        <button onClick={() => 
          {document.querySelector('#what-is-record-books')?.scrollIntoView({behavior: 'smooth'})}} className='navItem'>
            About
        </button>
        <button onClick={() => 
          {document.querySelector('#meet-the-team')?.scrollIntoView({behavior: 'smooth'})}} className='navItem'>
            Meet the team
        </button>
        <button onClick={() => 
          {document.querySelector('#contact-us')?.scrollIntoView({behavior: 'smooth'})}} className='navItem'>
            Contact Us
        </button>
        <Link href='/docs' className='navItem'>Docs</Link>
      </>
    )
  }
}

/**
 * Navbar component
 * @param {Boolean} isBasic - Whether to show the basic landing page navbar or the dashboard navbar
 * @param {Boolean} isAuth - Whether the user is authenticated or not
 * @returns {JSX.Element} Navbar component
 * @example <Navbar isBasic={true} isAuth={true}/>
 */
export default function Navbar(props){
  var isBasic = props.isBasic;
  var isAuth = props.isAuth;
  var pageName = props.pageName;

  if (isBasic) {
    if (isAuth) {
      return (
        <nav className='basicNavBar'>
          <Link href='/' className='navTitle'>
            <h1>4-H Record Books</h1>
          </Link>
    
          <div className='navGroup'>
            <NoAuthNavItems pageName={pageName}/>
            <Link href='/dashboard' className='navItem'>Go to Dashboard</Link>
          </div>
        </nav>
      )
    } else {
      return (
        <nav className='basicNavBar'>
          <Link href='/' className='navTitle'>
            <h1>4-H Record Books</h1>
          </Link>
    
          <div className='navGroup'>
          <NoAuthNavItems pageName={pageName}/>
            <Link href='/api/auth/login' className='navItem'>Sign up/Sign in</Link>
          </div>
        </nav>
      )
    }
  } else {
    return (
      <nav className='dashNavBar'>
        <Link href='/dashboard/' className='navTitle'>
          <h1>4-H Record Books</h1>
        </Link>
  
        <div className='navGroup'>
          <Link href='/dashboard/' className='navItem'>
            <MdOutlineHome className='navIcon'/>
            Home
          </Link>
  
          <Link href='/dashboard/resume' className='navItem'>
            <MdOutlineDescription className='navIcon'/>
            4-H Resume
          </Link>
  
          <Link href='/dashboard/projects' className='navItem'>
            <MdContentPaste className='navIcon'/>
            My Projects
          </Link>
  
          <Link href='/dashboard/account' className='navItem'>
            <MdOutlineAccountCircle className='navIcon'/>
            Account
          </Link>
        </div>
      </nav>
    )
  }
}