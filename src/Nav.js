import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Nav.css';
import PlansScreen from './PlansScreen';
import { db } from "./firebase";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";

function Nav(){
    const [show, handleShow] = useState(false);
    const history = useHistory();
    const [products, setProducts] = useState([]);
    const [subscription, setSubscription] = useState(null);
    const user = useSelector(selectUser);

    const transitionNavBar = () => {
        if(window.scrollY > 100){
            handleShow(true);
        }else{
            handleShow(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll",transitionNavBar);
        return () => window.removeEventListener("scroll",transitionNavBar);
    }, []);
    
    useEffect(() => {
        db.collection('customers').doc(user.uid).collection('subscriptions').get().then(querySnapshot => {
            querySnapshot.forEach(async subscription => {
                setSubscription({
                    role: subscription.data().role,
                    current_period_end: subscription.data().current_period_end.seconds,
                    current_period_start: subscription.data().current_period_start.seconds,
                })
            })
        })
    }, [user.uid])
    
    useEffect(() => {
        db.collection('products').where('active','==',true).get().then((querySnapshot) => {
            const products = {};
            querySnapshot.forEach(async (productDoc) => {
                products[productDoc.id] = productDoc.data();
                const priceSnap = await productDoc.ref.collection('prices').get();
                priceSnap.docs.forEach((price) => {
                    products[productDoc.id].prices = {
                        priceId: price.id,
                        priceData: price.data(),
                    };
                });
            });
            setProducts(products);
        });
     },[]);

     const loadCheckout = async(priceId) => {
        const docRef = await db.collection('customers').doc(user.uid).collection('checkout_sessions').add({
            price: priceId, 
            success_url: window.location.origin,
            cancel_url: window.location.origin,
        });

        docRef.onSnapshot(async(snap) => {
            const { error,sessionId } = snap.data();

            if(error){
                alert(`An error occured: ${error.message}`);
            }

            if(sessionId) {
                const stripe = await loadStripe('pk_test_51Jpy9GSDZ0IM4kinv2mMLto1I9gvpHRsHGu9v138xFxdCvcTCWz7l5o4Tz4Xz3Jy52VLgxXy2Z1otXX19G9tzuYy00aOXgAdXN');
                stripe.redirectToCheckout({ sessionId });
            }
        });
    }; 
    
    return ( 
        <div className={`nav ${show && "nav_black"}`}>
            <div className='nav_wrapper'>
            {subscription && <p></p>}
            {Object.entries(products).map(([productId, productData]) => {
               const isCurrentPackage = productData.name?.toLowerCase().includes(subscription?.role);
               return(
                   <img 
                   onClick={() => {subscription?.role ? history.push("/") : history.push("/profile")}} className='nav-logo-img' src="https://images.squarespace-cdn.com/content/v1/5f85bf0dad96fa46a2cf4117/1602961591614-C91N3BRQ4ZBYAE2OKAJX/LOGO.png" alt="Hyper-Stream-logo" />
                )
               })}
                <h3 onClick={() => history.push("/profile")} className='edit_profile'>Profile</h3>
            </div>
        </div>
    )
}

export default Nav;