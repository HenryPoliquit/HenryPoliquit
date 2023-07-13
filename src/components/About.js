import React from "react";
import profile from '../assets/images/profile.png';
import ScrollAnimation from "react-animate-on-scroll";

function About() {
    return (
        <main className='about-wrapper' id="about">
            <div className="container pt-5">
                <ScrollAnimation animateIn="animate__fadeInRight" animateOnce={true}>
                    <div>
                        <h1 className="mt-5 text-center">ABOUT ME</h1>
                        <div className="mb-5 header-bar">
                        </div>
                    </div>
                </ScrollAnimation>
                <ScrollAnimation animateIn="animate__fadeInUp" duration={0.7} animateOnce={true}>
                    <div className="row pb-4 text-center">
                        <div className="col-lg-3 col-md-3 col-sm-6 octagon-wrapper">
                            <div className="octagon img1">
                                <div></div>
                            </div>
                            <h2>Responsive</h2>
                            <p>I make sure that my layouts will work on any devices, big or small.</p>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6 octagon-wrapper">
                            <div className="octagon img2">
                                <div></div>
                            </div>
                            <h2>Dynamic</h2>
                            <p>Websites can have life too. Let me show you.</p>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6 octagon-wrapper">
                            <div className="octagon img3">
                                <div></div>
                            </div>
                            <h2>Simple</h2>
                            <p>I offer simplistic design with excellent functionality.</p>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6 octagon-wrapper">
                            <div className="octagon img4">
                                <div></div>
                            </div>
                            <h2>Unique</h2>
                            <p>My UI/UX design showcase my creativity. I always add something special.</p>
                        </div>
                    </div>
                </ScrollAnimation>
                <ScrollAnimation animateIn="animate__fadeInLeft" animateOnce={true}>
                    <div className="row pt-4 mt-lg-3 mt-md-3 mt-sm-0 pb-2">
                        <div className="col-lg-6 col-md-6 col-sm-12 mb-sm-4 progress-wrapper">
                            <div className="progress">
                                <div className="progress-bar progress-bar-striped progress-label" id="css" role="progressbar" aria-label="css" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">CSS</div>
                                <div className="progress-empty progress-label">75%</div>
                            </div>
                            <div className="progress">
                                <div className="progress-bar progress-bar-striped progress-label" id="html" role="progressbar" aria-label="html" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">HTML</div>
                                <div className="progress-empty progress-label">80%</div>
                            </div>
                            <div className="progress">
                                <div className="progress-bar progress-bar-striped progress-label" id="javascript" role="progressbar" aria-label="javascript" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100">Javascript</div>
                                <div className="progress-empty progress-label">70%</div>
                            </div>
                            <div className="progress">
                                <div className="progress-bar progress-bar-striped progress-label" id="react" role="progressbar" aria-label="react" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100">React</div>
                                <div className="progress-empty progress-label">70%</div>
                            </div>
                            <div className="progress">
                                <div className="progress-bar progress-bar-striped progress-label" id="java" role="progressbar" aria-label="java" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">Java</div>
                                <div className="progress-empty progress-label">75%</div>
                            </div>
                            <div className="progress">
                                <div className="progress-bar progress-bar-striped progress-label" id="mysql" role="progressbar" aria-label="mysql" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">MySQL</div>
                                <div className="progress-empty progress-label">80%</div>
                            </div>
                            <div className="progress">
                                <div className="progress-bar progress-bar-striped progress-label" id="sts" role="progressbar" aria-label="sts" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">STS</div>
                                <div className="progress-empty progress-label">80%</div>
                            </div>
                            <div className="progress">
                                <div className="progress-bar progress-bar-striped progress-label" id="vscode" role="progressbar" aria-label="vscode" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">Visual Studio</div>
                                <div className="progress-empty progress-label">80%</div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 mt-lg-0 mt-md-0 mt-sm-4 mt-5 octagon-wrapper text-center">
                            <div className="octagon-img"><img className="img-fluid" src={profile} alt="Profile" height={"100%"} width={"100%"} /></div>
                            <h2>Who am I?</h2>
                            <p>I am a software engineering student at Lithan EduClaaS. I love learning and taking on challenges that may further expand my knowledge and skills. I look forward on getting more experience in the fields of software engineering.</p>
                        </div>
                    </div>
                </ScrollAnimation>
            </div>
        </main>
    )
}

export default About;