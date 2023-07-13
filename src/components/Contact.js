import { useRef } from "react";
import emailjs from '@emailjs/browser';
import ScrollAnimation from "react-animate-on-scroll";

const Contact = () => {
    const form = useRef()

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_05uptif', 'template_n4ib3bf', form.current, 'g-_jWuDvabBx7rRAh')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        e.target.reset()
    };

    return (
        <main className='contact-wrapper' id="contact">
            <div className="container text-center pt-3">
                <ScrollAnimation animateIn="animate__fadeInRight" animateOnce={true}>
                    <div>
                        <h1 className="mt-3">CONTACT</h1>
                        <div className="mb-5 header-bar">
                        </div>
                    </div>
                </ScrollAnimation>
                <div>
                    <ScrollAnimation animateIn="animate__fadeInDown" duration={0.7} animateOnce={true}>
                        <h2 className="lead">Have a question? Contact me</h2>
                        <form className="form" ref={form} onSubmit={sendEmail}>
                            <div className="contact-form">
                                <input className="form-control" type="text" placeholder="Name" name="user_name" required />
                                <input className="form-control" type="email" placeholder="Enter email" name="user_email" required />
                                <input className="form-control" type="text" placeholder="Subject" name="subject" required />
                                <textarea className="form-control" rows="3" placeholder="Enter your message" name="message" required />
                                <button type="submit" className="btn btn-primary">Send Message</button>
                            </div>
                        </form>
                    </ScrollAnimation>
                </div>
            </div>
            <div className="mt-3">
                <ScrollAnimation animateIn="animate__fadeInLeft" animateOnce={true}>
                    <h2 className="text-dark text-center mb-2">Social Links</h2>
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
                    <div className="wrap mt-2">
                        <h2 className="text-dark text-center mb-2">Contact Number</h2>
                        <h4 className="text-dark">
                            +639158171758
                        </h4>
                    </div>
                </ScrollAnimation>
            </div>
        </main>
    )
};

export default Contact;