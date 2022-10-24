import React, { useState} from "react";
import './LoginScreen.css';
import SignupScreen from "./SignupScreen";

function LoginScreen() {
    const [signIn, setSignIn] =useState(false);
    
    return (
        <div className="loginScreen">
            <div className="loginScreen_background">
                <img className="loginScreen_logo" src="https://images.squarespace-cdn.com/content/v1/5f85bf0dad96fa46a2cf4117/1602961591614-C91N3BRQ4ZBYAE2OKAJX/LOGO.png" alt="logo"/>
                <button onClick={() => setSignIn(true)} className="loginScreen_button">Sign In</button>
                <div className="loginScreen_gradient" />
                <div className="loginScreen_body">
                    {signIn ? (<SignupScreen />) : (
                   <>
                     <h1>Unlimited films, TV programmes and more.</h1>
                     <h2>Watch anytime anywhere. Cancel at any time.</h2>
                     <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
                     <div className="loginScreen_input">
                         <form>
                            <input type="email" placeholder="Email Address" />
                            <button onClick={() => setSignIn(true)} className="loginScreen_getStarted">GET STARTED</button>
                         </form>
                     </div>
                   </>
                    )}
                </div>
            </div>
            <div className="about-us">
                <h1><br></br><hr></hr>About Us</h1>
                <p><br></br>
                Hyperstream is a subscription-based streaming service that allows our members to watch TV shows and movies without commercials on an internet-connected device.
                Hyperstream can be accessed via internet browser on computers, or smartphones.
                It is available in 720p, 1080p and 4K + HDR resolution.
                Hyperstream was developed by Vaibhav Jain, Vishal Kumar Singh, Mohd. Arhan Khan and Washit Parvez in Delhi, India.
                Hyperstream was purely a movie rental service 
                We provides mainly three plans which are basic Plan, Standard Plan and Premium Plan. 
                Basic Plan is in 720p at Rs.799.
                Standard Plan is in 1080p at Rs.899.
                Premium Plan is in 4K+HDR at Rs.999.
                Hyperstream allows people to watch any movie or tv show from anywhere in the world at any time.
                It also allows people to cancel their subscription any time.
                </p>
            </div>
            <div className="contact-us">
                <h1><br></br><hr></hr>Contact Us</h1>
                <div className="division">
                    <h2>Location: New Delhi,India</h2>
                    <h2>Phone Number: (+91)9873094703</h2>
                </div>
            </div>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <hr></hr>
            <div class="footer">
                <span>&copy;</span>
                <p>Copyright 2021 Hyperstream - All Rights Reserved</p>
            </div>
        </div>   
    );
}

export default LoginScreen;