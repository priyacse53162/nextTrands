import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const total = cartList.map(eachitem => eachitem.price * eachitem.quantity)

      const totalamount = total.reduce((sum, value) => (sum += value))
      const {length} = cartList
      return (
        <div className="CartSummary">
          <h1 className="totalamount">
            Order Total: <span className="amount">Rs {totalamount}</span>
          </h1>
          <p className="totalitem">{length} Items in cart</p>
          <button className="checkoutbutton">checkout</button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
