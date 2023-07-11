import React from "react";
import { Typewriter } from "react-simple-typewriter";
import { Link } from 'react-scroll';
import ScrollAnimation from "react-animate-on-scroll";

function Home() {
    return (
        <main className='home-wrapper home' id="home">
            <div className="text-center mt-5">
                <h1 className="text-light">Hello, I am <span className="text-primary">Paul Henry V. Poliquit</span>,</h1>
                <h1 className="text-light">
                    A
                    <span className="text-primary">
                        <Typewriter
                            words={[' Software Engineering Student', ' Full-stack Web Developer']}
                            loop={2}
                            cursor
                            cursorStyle='_'
                            typeSpeed={110}
                            deleteSpeed={60}
                            delaySpeed={1000}
                        />
                    </span>
                </h1>
                <div className="home-btn-wrapper">
                    <Link className='btn btn-outline-primary' to="about">View my work</Link>
                    <button className='btn btn-outline-primary'>Download my CV</button>
                </div>
            </div>
            <div className="mt-3">
                <ScrollAnimation animateIn="animate__fadeInLeft" animateOnce={true}>
                    <h2 className="text-light text-center mb-2">Social Links</h2>
                    <div className="wrap">
                        <a className="btn btn-facebook" href="https://www.facebook.com/profile.php?id=100013486023337" role="button">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a className="btn btn-linkedIn" href="https://www.linkedin.com/in/paul-henry-poliquit-7b5b60250?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BHZTC7hMVQtqNcimHCCEQBA%3D%3D" role="button">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                        <a className="btn btn-github" href="https://github.com/HenryPoliquit" role="button">
                            <i className="fab fa-github"></i>
                        </a>
                    </div>
                </ScrollAnimation>
                <ScrollAnimation animateIn="animate__fadeInLeft" animateOnce={true}>
                    <div className="wrap">
                        <a className="btn text-light" href="https://youtu.be/Yv1IDQurjM0" role="button">
                            Click to view my Video Introduction
                        </a>
                    </div>
                </ScrollAnimation>
                <ScrollAnimation animateIn="animate__fadeInLeft" animateOnce={true}>
                    <div className="wrap">
                        <a className="btn text-light" href="mailto:someone@example.com?Subject=Hello%20again" target="_top">
                            paulpoliquit@gmail.com
                        </a>
                    </div>
                </ScrollAnimation>
            </div>
        </main>
    )
}

export default Home;