// ./src/app/components/NavBar.jsx
import Link from 'next/link'
import { MdContentPaste, MdOutlineDescription, MdOutlineHome, MdOutlineAccountCircle } from "react-icons/md"

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

  if (isBasic) {
    if (isAuth) {
      return (
        <nav className='basicNavBar'>
          <Link href='/' className='navTitle'>
            <h1>4-H Record Books</h1>
          </Link>
    
          <div className='navGroup'>
            <Link href='/about' className='navItem'>About</Link>
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
            <Link href='/about' className='navItem'>About</Link>
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