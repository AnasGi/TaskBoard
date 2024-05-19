import React from "react";
// import { IonIcon } from "@ionic/react";
// import { person, mail, documentText } from "ionicons/icons";
import TextField from "@mui/material/TextField";

export default function ContactUs() {
  return (
    <div className="contactFormWrapper d-flex justify-content-center shadow">
      <div className="w-100">
        <h2 className="fw-bold text-center">Get in Touch</h2>
        <p className="text-center text-body-secondary">
          Share your opinions with us! Your feedback is invaluable and helps us
          improve.
        </p>
        <form>
          <div className="mt-3">
          <TextField
            id="outlined-basic"
            label="Full name"
            variant="outlined"
            className="w-100"
            required
          />
          </div>
          <div className="mt-3">
            <TextField
              id="outlined-multiline-static"
              label="Opinion or Question"
              className="w-100"
              multiline
              rows={4}
              required
            />
          </div>
          
          <div className="mt-3 w-100">
            <button type="submit" className="btn btn-dark text-center w-100">
              Send
            </button>
          </div>
          

          
        </form>
      </div>
    </div>
  );
}
