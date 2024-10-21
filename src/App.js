import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item
  removeCartItem = id => {
    const {cartList} = this.state

    const filteredList = cartList.filter(eachitem => eachitem.id !== id)
    this.setState({cartList: filteredList})
  }

  addCartItem = product => {
    const {cartList} = this.state
    const idList = cartList.map(eachitem => eachitem.id)

    if (idList.includes(product.id)) {
      const updatedList = cartList.map(eachcart => {
        if (eachcart.id === product.id) {
          return {...eachcart, quantity: eachcart.quantity + product.quantity}
        }
        return eachcart
      })
      this.setState({cartList: updatedList})
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedList = cartList.map(eachcart => {
      if (eachcart.id === id) {
        return {...eachcart, quantity: eachcart.quantity + 1}
      }
      return eachcart
    })
    this.setState({cartList: updatedList})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state

    const updatedList = cartList.find(eachcart => eachcart.id === id)

    if (updatedList.quantity === 1) {
      const filteredList = cartList.filter(eachitem => eachitem.id !== id)
      this.setState({cartList: filteredList})
    } else {
      const filteredList = cartList.filter(eachitem => eachitem.id !== id)
      const updatedcartList = [
        ...filteredList,
        {...updatedList, quantity: updatedList.quantity - 1},
      ]
      this.setState({cartList: updatedcartList})
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
