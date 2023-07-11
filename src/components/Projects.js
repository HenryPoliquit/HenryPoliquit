import { Component } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ScrollAnimation from "react-animate-on-scroll";

class Project extends Component {
    render() {
        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 3,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2
                    }
                }
            ]
        };
        let projectList = [
            {
                Title: "Meals on Wheels",
                Desc: "Meals on Wheels is an online ordering system application for MerryMeal, a charitable organization that prepares and delivers hot noon meals to adults living at home who are unable to cook for themselves, maintain their nutritional status due to age, disease, or disability. It is developed using Spring Boot with MySQL as the database.",
                ImagePath:
                    "https://onedrive.live.com/embed?resid=D84592B03776F086%21116&authkey=%21AMujULr6IiGrPLc&width=480&height=270",
                Link: "https://github.com/BDSE-0922-Group/DEA-SA",
            },
            {
                Title: "Know Your Neighborhood",
                Desc: "Know Your Neighborhood, or KYN, is a community website that provides users with information about stores in their neighborhood. The project front-end is developed using React JS and connected to the back-end using Axios with a custom REST API. The site also features google, and facebook login capabilities to enhance the user experience.",
                ImagePath:
                    "https://onedrive.live.com/embed?resid=D84592B03776F086%21115&authkey=%21AFmVP_KRtFtTJa4&width=480&height=270",
                Link: "https://github.com/HenryPoliquit/KnowYourNeigborhood",
            },
            {
                Title: "ABC Job Portal",
                Desc: "ABC Job Portal is a job-hunting similiar to Linkedin, users of the website are able to sign up, login, change their password, and edit their profiles. Administrators on the website can also manage the users and their information on the website. The website was built using Spring MVC. with MySQL for the database.",
                ImagePath:
                    "https://onedrive.live.com/embed?resid=D84592B03776F086%21114&authkey=%21AEb8JQ-kOu13jmU&width=480&height=270",
                Link: "https://github.com/HenryPoliquit/ABCJobPortal",
            },
            {
                Title: "ABC Car Portal",
                Desc: "ABC Car Portal is a used-car sales website, it allows users to create an account and post their car on the platform for sale. Other users are able to book the car for a test drive or place a bid. Administrators on the website take charge in approving bids and booking dates for cars on the platform. (They are also able to manage the cars and users on the platform)",
                ImagePath:
                    "https://onedrive.live.com/embed?resid=D84592B03776F086%21113&authkey=%21ALp5zvHKHrKzXyQ&width=480&height=270",
                Link: "https://github.com/HenryPoliquit/ABCCarPortal",
            },
        ];

        const allProjects = projectList.map((project, index) => {
            return (
                <div className="card" key={index}>
                    <img className="card-img-top img-fluid" src={project.ImagePath}
                        alt="Project" />
                    <div className="card-body">
                        <h3 className="card-title">{project.Title}</h3>
                        <p className="card-text">
                            {project.Desc}
                        </p>
                        <a href={project.Link} className="btn btn-primary">Explore Project</a>
                    </div>
                </div>
            );
        });

        return (
            <main className='project-wrapper' id="project">
                <div className="text-center pt-5">
                    <ScrollAnimation animateIn="animate__fadeInRight" animateOnce={true}>
                        <div>
                            <h1 className="mt-5 text-light">PROJECTS</h1>
                            <div className="mb-5 header-bar bg-light">
                            </div>
                        </div>
                    </ScrollAnimation>
                    <div className="container pb-5">
                        <ScrollAnimation animateIn="animate__fadeInUp" duration={0.7} animateOnce={true}>
                            <h2 className="text-light">What I've been up to?</h2>
                            <Slider {...settings}>
                                {allProjects}
                            </Slider>
                        </ScrollAnimation>
                    </div>
                </div>
            </main>
        );
    }
}

export default Project;