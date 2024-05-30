import React, { useState } from "react";
// import { IonIcon } from "@ionic/react";
// import { person, mail, documentText } from "ionicons/icons";
import TextField from "@mui/material/TextField";
import emailjs from "emailjs-com";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_6xk7nxc",
        "template_d2c2z0s",
        formData,
        "UluLeVHZyr8FGHdWL"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          setStatus("SUCCESS");
        },
        (error) => {
          console.log("FAILED...", error);
          setStatus("FAILED");
        }
      );

    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };
  return (
    <div className="d-flex justify-content-center">
      <div className="w-100">
        <h2 className="fw-bold text-center">Get in Touch</h2>
        <p className="text-center text-body-secondary">
          Share your opinions with us! Your feedback is invaluable and helps us
          improve.
        </p>
        {status === "SUCCESS" && (
          <div className="alert alert-success">
            Your message was sent successfully!
          </div>
        )}
        {status === "FAILED" && (
          <div className="alert alert-danger">
            Failed to send your message. Please try again.
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mt-3">
          <TextField
            id="outlined-basic"
            label="Full name"
            variant="outlined"
            className="w-100"
            name="name"
            onChange={handleChange}
            required
          />
          
          </div>
          <div className="mt-3">
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            className="w-100"
            name="email"
            email
            onChange={handleChange}
            required
          />
          </div>
          <div className="mt-3">
            <TextField
              id="outlined-multiline-static"
              label="Opinion or Question"
              className="w-100"
              multiline
              name="message"
              onChange={handleChange}
              rows={4}
              required
            />
          </div>
          
          <div className="mt-3 w-100">
            <button type="submit" className="btn btn-outline-dark text-center w-100">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
