
import { Link } from 'react-router-dom'

const Mainav = () => {
  return (
    <nav className='mx-4'>
      <div>
        <div className='flex justify-between py-4 '>
            <div className='flex gap-2'>
                <Link to={'/'}>Home</Link>
                <Link to={'/about'}>Todolist</Link>
            </div>
            <div className='flex gap-2'>
                <Link to={'/register'}>Register</Link>
                <Link to={'/login'}>Login</Link>
            </div>
        </div>
      </div>
    </nav>
  )
}

export default Mainav
