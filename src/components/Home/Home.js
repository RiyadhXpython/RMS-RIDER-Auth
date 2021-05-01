import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import fakeData from '../../fakeData/RideData';
import './Home.css'
const Home = () => {

    const [cart, setCart] = useState([])

    useEffect(() => {
        const data =fakeData;
        setCart(data);
    }, [])

    return (
        <div className="cart home-cart">
            {
                cart.map(cart => <Cart cart={cart}></Cart>)
            }
           
        </div>
    );
};

export default Home;