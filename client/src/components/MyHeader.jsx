import './MyHeader.css'
export const MyHeader = () => {

  return(
    <header>
      <h1>MiniStore 🛒</h1>
      <form className='search'>
        <input type="text" />
        <input type='submit' />  
      </form>
      <div className='btns'>
        <button>login</button>
        <button>Cart</button>
      </div>
    </header>
  )
}