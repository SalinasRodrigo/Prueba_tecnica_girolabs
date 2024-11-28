import { Cart } from './Cart'
import SearchIcon from './Icons'
import './MyHeader.css'
export const MyHeader = () => {

  return(
    <header>
      <h1>MiniStore 🛒</h1>
      <form className='search'>
        <input type="text" />
        <button className='search-btn' type='submit'><SearchIcon/></button>
      </form>
      <div className='btns'>
        <button className='btn'>Login</button>
        <Cart/>
      </div>
    </header>
  )
}