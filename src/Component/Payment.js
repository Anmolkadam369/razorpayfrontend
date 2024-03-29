import './Payment.css';
import axios from 'axios';
import { useState } from 'react';
function Payment() {
  const [book, setbook] = useState({
    name: "lifeStory",
    author:"Anmol",
    img:"https://th.bing.com/th?id=OIP.O8X2cM_d8XTou4d3_YlbgAHaLH&w=204&h=306&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
    price:250,
  });

const initPayment = (data) => {
  const options = {
    key: '---------------',
    amount : data.amount,
    currency : data.currency,
    name : book.name,
    description : "Test Transaction",
    img : book.img,
    order_id : data.id,
    handler : async (response) => {
      try {
        const verifyUrl = 'http://localhost:3001/verify';
        const {data} = await axios.post(verifyUrl, response);
        console.log("verifyData",data);
      } catch (error) {
        console.log(error)
      }
    },
    theme:{
      color: "#3399cc"
    },
  }
  const rzp1 = new window.Razorpay(options);
  rzp1.open();
}

  const handlePayment = async () => {
    try {
      const orderUrl = 'http://localhost:3001/orders';
      const {data} = await axios.post(orderUrl, {
        amount: book.price
      });
      console.log("orderData",data);
      initPayment(data.data);
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="payment">
      <div className='book_container'>
        <img src={book.img} alt="book_img" className='book_img'/>
        <p className='book_name'>{book.name}</p>
        <p className='book_author'>{book.author}</p>
        <p className='book_price'>
          Price:<span>&#x20B9;{book.price}</span>
        </p>
        <button onClick={handlePayment} className='buy_btn'>buy Now</button>
      </div>
    </div>
  );
}

export { Payment};
