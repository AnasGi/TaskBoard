import React, { useEffect, useState } from "react";
import { SignedOut, SignInButton } from "@clerk/clerk-react";
import logo from "../Assets/logo.gif";
import getStarted from "../Assets/getStarted.webp";
import { ReactComponent as Fb } from "../Assets/facebook.svg";
import { ReactComponent as Insta } from "../Assets/instagram.svg";
import { ReactComponent as In } from "../Assets/linkedin.svg";
import tasksPage from "../Assets/tasksPage.jpg";
import notesPage from "../Assets/notesPage.jpg";
import statsPage from "../Assets/statsPage.jpg";
import Backdrop from "@mui/material/Backdrop";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import ContactUs from "./ContactUs";
import CircularProgress from "@mui/material/CircularProgress";
import "../styles/welcome.css";
import GetRatings from "../hooks/GetRatings";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import Team from "./Team";

export default function Welcome() {
  const pros = [
    {
      title: "Simple layout",
      text: "Show only tasks assigned to you, or items marked as urgent. Break down any project in the way that’s most helpful to you.",
    },
    {
      title: "All-in-One package",
      text: "Find all necessary tools you need to organize your tasks efficiently. From task categorization to deadline management, we've got you covered.",
    },
    {
      title: "Statistics",
      text: "Gain a holistic view of your tasks with detailed statistics and progress tracking.",
    },
  ];

  const sitePreviewImgs = [
    {
      img: tasksPage,
      title: "Manage your tasks",
      text: "TaskBoard offer a simple way to manage your tasks, mark them as important, active or completed, filter and sort them as you please, plus you can categorize them for better organization",
    },
    {
      img: notesPage,
      title: "Keep note of your notes",
      text: "Notes are simple, and we make them simpler,easier and appealing with TaskBoard",
    },
    {
      img: statsPage,
      title: "Follow your progress",
      text: "Keep track of your progress, TaskBoard helps you to visualize your daily progress",
    },
  ];

  const footerLinkStyle =
    "link-underline link-underline-opacity-0 link-underline-opacity-75-hover text-body-secondary";

  let [index, setIndex] = useState(0);
  let [indexImg, setIndexImg] = useState(0);
  const [ShowContactForm, setShowContactForm] = useState(false);
  const allRatings = GetRatings();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex < 2 ? prevIndex + 1 : 0));
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [index]);

  return (
    <SignedOut>
      <div className="h-100">
        <nav className="z-3 navbar navbar-expand-lg bg-body-tertiary w-100 position-sticky top-0">
          <div className="container-fluid">
            <div className="d-flex gap-5">
              <a className="navbar-brand" href="/">
                <img src={logo} alt="TaskBoard logo" title="TaskBoard" />
                <span className="fw-bold" id="taskBoard">
                  TaskBoard
                </span>
              </a>
              <div className="d-flex gap-4 align-items-center HeaderLinks">
                <a href="#peek">Discover</a>
                <a href="#about">About</a>
                <a href="#team">Team</a>
                <a href="#feedbacks">Feedbacks</a>
                <a
                  href="#contact-us"
                  onClick={() => setShowContactForm(true)}
                  className="welcomeNavLink"
                >
                  Contact
                </a>
              </div>
            </div>
            <Backdrop
              sx={{
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                zIndex: 2,
              }}
              open={ShowContactForm}
              className="flex-column"
            >
              <div className="contactFormWrapper shadow">
                <ContactUs />
                <div className="w-100 mt-2">
                  <button
                    className="btn btn-outline-danger w-100"
                    onClick={() => setShowContactForm(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </Backdrop>
            <div className="d-flex gap-2 align-items-center">
              <span className="text-body-secondary" id="login">
                Log in or create a new account
              </span>
              <svg width="1" height="20">
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="100"
                  stroke="black"
                  stroke-width="1"
                />
              </svg>
              <SignInButton className="btn btn-dark" />
            </div>
          </div>
        </nav>
        <main className="text-center h-50 d-flex align-items-center justify-content-center">
          <section className="w-100">
            <h1 className="fw-bold p-2 w-100" style={{ fontSize: "5vw" }}>
              Write,plan,organize
            </h1>
            <div className="text-center p-2 d-flex justify-content-center">
              <p className="fw-bold w-50">
                Plan your day with TaskBoard, make your tasks and notes palning
                easy
              </p>
            </div>
            <div>
              <span className="text-body-secondary p-2">
                Begin your success journey
              </span>
              <SignInButton className="text-decoration-underline border-0 bg-body link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" />
            </div>
          </section>
        </main>
        <article style={{ height: "500px" }}>
          <header>
            <div className="prosList d-flex justify-content-center gap-5">
              <div
                className={`iconWrapper ${index === 0 && "shadow"}`}
                onClick={() => setIndex(0)}
              >
                <lord-icon
                  src="https://cdn.lordicon.com/vweaucqr.json"
                  trigger="hover"
                  colors="primary:#121331,secondary:#ffffff"
                  style={{ width: "120px", height: "120px" }}
                ></lord-icon>
              </div>
              <div
                className={`iconWrapper ${index === 1 && "shadow"}`}
                onClick={() => setIndex(1)}
              >
                <lord-icon
                  src="https://cdn.lordicon.com/qxqvtswi.json"
                  trigger="hover"
                  colors="primary:#121331,secondary:#ffffff,tertiary:#000000"
                  style={{ width: "120px", height: "120px" }}
                ></lord-icon>
              </div>
              <div
                className={`iconWrapper ${index === 2 && "shadow"}`}
                onClick={() => setIndex(2)}
              >
                <lord-icon
                  src="https://cdn.lordicon.com/ofcynlwa.json"
                  trigger="hover"
                  colors="primary:#000000,secondary:#ffffff,tertiary:#ffffff,quaternary:#ffffff"
                  style={{ width: "120px", height: "120px" }}
                ></lord-icon>
              </div>
            </div>
          </header>
          <aside className="w-100 mt-5 text-center">
            <h1 className="fw-bold">{pros[index].title}</h1>
            <div className="d-flex justify-content-center">
              <p className="w-25 prosText" key={pros[index].title}>
                {pros[index].text}
              </p>
            </div>
          </aside>
        </article>

        <section id="peek">
          <article className="text-center" id="previewText" key={indexImg}>
            <h1 className="fw-bold">{sitePreviewImgs[indexImg].title}</h1>
            <div className="d-flex justify-content-center">
              <p className="text-body-secondary w-50">
                {sitePreviewImgs[indexImg].text}
              </p>
            </div>
          </article>
          <aside className="siteImgsWrapper mt-3">
            <img
              src={sitePreviewImgs[indexImg].img}
              alt=""
              className="shadow"
            />
            <RadioGroup
              defaultValue="tasks"
              name="radio-buttons-group"
              className="flex-row"
            >
              <Radio
                onClick={() => setIndexImg(0)}
                value={"tasks"}
                color="secondary"
              />
              <Radio
                onClick={() => setIndexImg(1)}
                value={"notes"}
                color="success"
              />
              <Radio onClick={() => setIndexImg(2)} value={"stats"} />
            </RadioGroup>
          </aside>
        </section>

        <div className="mt-5 d-flex justify-content-center" id="about">
          <hr className="w-50" />
        </div>

        <section className="mt-5">
          <h1 className="text-center mb-3 fw-bold" style={{ fontSize: "50px" }}>
            About TaskBoard
          </h1>
          <div className="d-flex justify-content-center h-100">
            <p
              className="text-center w-50 lh-lg fw-lighter fst-italic"
              style={{ fontSize: "17px" }}
            >
              TaskBoard is a versatile organizational app designed to streamline
              your daily workflow by efficiently managing tasks and notes. With
              its intuitive interface, TaskBoard empowers users to create,
              prioritize, and track tasks seamlessly, ensuring nothing falls
              through the cracks. Whether you're juggling work projects,
              personal errands, or creative endeavors, TaskBoard provides the
              flexibility to customize boards, columns, and cards to suit your
              unique needs. Stay organized with drag-and-drop functionality,
              allowing you to effortlessly move tasks between different stages
              of completion. Additionally, TaskBoard seamlessly integrates
              note-taking capabilities, allowing users to capture ideas,
              insights, and reminders alongside their tasks. With TaskBoard,
              you'll never miss a deadline or forget an important detail,
              empowering you to stay focused, productive, and in control of your
              day.
            </p>
          </div>

          <div className="mt-5 d-flex justify-content-center" id="team">
            <hr className="w-50" />
          </div>
          <Team />
        </section>

        <div className="mt-5 mb-5 d-flex justify-content-center">
          <hr className="w-50" />
        </div>

        <aside style={{ height: "400px" }} id="feedbacks">
          <h1 className="fw-bold text-center" style={{ fontSize: "50px" }}>
            Our users experiences
          </h1>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            spaceBetween={30}
            slidesPerView={3}
            centeredSlides={true}
            loop={true}
            className="p-3 w-75"
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            pagination={{ clickable: true }}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {allRatings.length !== 0 ? (
              allRatings !== "load" ? (
                allRatings
                  .filter((rating) => rating.score >= 3 && rating.score <= 5)
                  .map((rate, i) => (
                    <SwiperSlide
                      key={i}
                      className="reviewCard rounded p-3 pb-0 shadow"
                      style={{height:"200px"}}
                    >
                      <div className="d-flex gap-2 align-items-center">
                        <Avatar>{rate.fullName.split(" ")[0][0]}</Avatar>
                        <div>
                          <p className="m-0 fw-bold">{rate.fullName}</p>
                          <p
                            className="m-0 text-body-secondary"
                            style={{ fontSize: "12px" }}
                          >
                            {new Date(rate.createdAt).toDateString()}
                          </p>
                        </div>
                      </div>
                      <hr />
                      <div className="">
                        <Rating
                          readOnly
                          name="simple-controlled"
                          value={rate.score}
                        />
                      </div>
                      <p>{rate.description}</p>
                    </SwiperSlide>
                  ))
              ) : (
                <CircularProgress />
              )
            ) : (
              <p className="text-center w-100">No ratings or reviews yet</p>
            )}
          </Swiper>
        </aside>

        <section>
          <h1 className="text-center mb-3 fw-bold" style={{ fontSize: "50px" }}>
            Get started today
          </h1>
          <div className="text-center">
            <p className="fs-5">Play around with it first. Love it later.</p>
            <span className="text-body-secondary">Enter TaskBoard </span>
            <SignInButton className="btn btn-body text-decoration-underline" />
            <div>
              <img src={getStarted} alt="" id="footerImg" className="w-80" />
              <hr className="m-0" />
            </div>
          </div>
        </section>

        <footer className="m-5 bg-body d-flex justify-content-around h-50">
          <div>
            <a className="navbar-brand" href="/">
              <img src={logo} alt="TaskBoard logo" title="TaskBoard" />
              <span className="fw-bold">TaskBoard</span>
            </a>
            <p className="text-body-secondary mt-3">
              &copy;
              <span className="m-2">
                {new Date().getFullYear()} TaskBoard project
              </span>
            </p>
          </div>
          <div>
            <div className="d-flex gap-5">
              <a href="/">
                <Fb className="social-media" />
              </a>
              <a href="/">
                <Insta className="social-media" />
              </a>
              <a href="/">
                <In className="social-media" />
              </a>
            </div>
            <hr />
            <div className="mb-2">
              <a className={footerLinkStyle} href="/">
                Home
              </a>
            </div>

            <div className="mb-2">
              <a className={footerLinkStyle} href="/#peek">
                Sneak peek
              </a>
            </div>

            <div className="mb-2">
              <a className={footerLinkStyle} href="/#about">
                About TaskBoard
              </a>
            </div>
            <div className="mb-2">
              <a className={footerLinkStyle} href="/#team">
                Our Team
              </a>
            </div>
            <div className="mb-2">
              <a className={footerLinkStyle} href="/#feedbacks">
                Feedbacks from users
              </a>
            </div>
            <div className="mb-2">
              <a
                className={footerLinkStyle}
                href="/#contact-us"
                onClick={() => setShowContactForm(true)}
              >
                Contact us
              </a>
            </div>
          </div>
        </footer>
      </div>
    </SignedOut>
  );
}
