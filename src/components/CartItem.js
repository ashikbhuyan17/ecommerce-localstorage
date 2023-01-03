import React from 'react';
import FormatPrice from '../Helpers/FormatPrice';
import CartAmountToggle from './CartAmountToggle';
import { FaTrash } from 'react-icons/fa';
import { useCartContext } from '../context/cart_context';
import { FaMinus, FaPlus } from 'react-icons/fa';
const CartItem = ({ id, name, image, color, price, amount }) => {
  const { removeItem, updateItem, decrementItem } = useCartContext();
  const setDecrease = (id) => {
    // amount > 1 ? setAmount(amount - 1) : setAmount(1);
    decrementItem(id);
  };

  const setIncrease = () => {
    // amount < stock ? setAmount(amount + 1) : setAmount(stock);
    updateItem(id);
  };

  return (
    <div className="cart_heading grid grid-five-column">
      <div className="cart-image--name">
        <div>
          <figure>
            <img src={image} alt={id} />
          </figure>
        </div>
        <div>
          <p>{name}</p>
          <div className="color-div">
            <p>color:</p>
            <div
              className="color-style"
              style={{ backgroundColor: color, color: color }}
            ></div>
          </div>
        </div>
      </div>
      {/* price   */}
      <div className="cart-hide">
        <p>
          <FormatPrice price={price} />
        </p>
      </div>

      {/* Quantity  */}
      {/* <CartAmountToggle
        amount={amount}
        setDecrease={setDecrease}
        setIncrease={setIncrease}
      /> */}
      <div className="cart-button">
        <div className="amount-toggle">
          <button onClick={() => setDecrease(id)}>
            <FaMinus />
          </button>
          <div className="amount-style">{amount}</div>
          <button onClick={() => setIncrease(id)}>
            <FaPlus />
          </button>
        </div>
      </div>

      {/* //Subtotal */}
      <div className="cart-hide">
        <p>
          <FormatPrice price={price * amount} />
        </p>
      </div>

      <div>
        <FaTrash className="remove_icon" onClick={() => removeItem(id)} />
      </div>
    </div>
  );
};

export default CartItem;
