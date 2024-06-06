import React from 'react';
import '../styles/Support.css'; 
import axios from 'axios';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ContactSupport from './ContactSupport';
import Rating from '@mui/material/Rating';
import Gears from '../Assets/management.gif'
import Swal from 'sweetalert2';
import CircularProgress from "@mui/material/CircularProgress";
import { useAuth, useUser } from '@clerk/clerk-react';
import GetRatings from '../hooks/GetRatings';
import Guide from './guide';

const Support= () => {

  const {userId} = useAuth()
  const { user } = useUser();

  const allRatings = GetRatings()

  const [value, setValue] = React.useState(0);
  const [description, setDescription] = React.useState("");
  const [showGuide, setShowGuide] = React.useState(false);

  async function storeRating(){
    let fullName;

    if (fullName) {
      fullName = user.fullName;
    } else {
      fullName = user.username;
    }
    try {
      await axios.post("http://localhost:8000/api/ratings", {description : description, score : value , createdAt : new Date() , userId : userId , fullName : fullName})
      Swal.fire({
        icon: "success",
        title: "Rating Saved",
        text: "Thanks for sharing your experience with us!",
        showConfirmButton: false,
        timer: 2000,
      }).then(() => window.location.reload());
    } catch (error) {
      console.error("Error adding task:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to save rating. Please try again later.",
        showCancelButton: "Back",
        showConfirmButton: false,
      });
    }
  }

  if(allRatings !== "load"){
    const userRating = allRatings.find(rate=>rate.userId === userId)
    return (
      <div className='supportContainer overflow-y-scroll' style={{ width: "90%", height: "100vh" }}>
          <header className='d-flex justify-content-center align-items-center gap-3 mt-3'>
            <div>
              <img src={Gears} alt='' style={{height:"200px"}}/>
            </div>
            <div>
              <h1 className='fw-bold'>Support and Help</h1>
              <p className=''>Find answers to your questions and get help from our TaskBoard team.</p>
            </div>
          </header>
  
          <div className='d-flex gap-2 supportCont'>
            <div style={{width:"100%"}}>
              <section id="faq">
                <h2>FAQ</h2>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <p className='fw-bold m-0'>Account</p>
                    
                  </AccordionSummary>
                  <AccordionDetails>
                  <ul>
                      <li><strong>How can I customize my account?</strong>
                        <p>To customize your account, click on your profile pictue on the expanded menu, then click "manage you account", then go to "profile".</p>
                      </li>
                      <li><strong>How can I reset my password?</strong>
                        <p>To reset your password, click on your profile pictue on the expanded menu, then click "manage you account", then go to "security".</p>
                      </li>
                      <li><strong>How do I sign out?</strong>
                        <p>To sign out from your account, click on your profile pictue on the expanded menu, then click "sign out".</p>
                      </li>
                    </ul>
                  </AccordionDetails>
                </Accordion>
  
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <p className='fw-bold m-0'>Tasks</p>
                    
                  </AccordionSummary>
                  <AccordionDetails>
                  <ul>
                      <li><strong>How can I add a new task?</strong>
                        <p>To add a new task, click on the plus "+" icon and fill in the necessary details.</p>
                      </li>
                      <li><strong>How can I mark a task as completed?</strong>
                        <p>To mark a task as completed, click on the checkbox next to the task.</p>
                      </li>
                      <li><strong>How can I mark a task as important?</strong>
                        <p>To mark a task as important, click on the important icon next to the task.</p>
                      </li>
                      <li><strong>How can I edit a task?</strong>
                        <p>To edit a task, hover over it, then click on the edit button next to the task.</p>
                      </li>
                      <li><strong>How can I delete a task?</strong>
                        <p>To delete a task, click on the trach icon at the end of the task.</p>
                      </li>
                      <li><strong>How can I filter my tasks?</strong>
                        <p>You can filter and sort your tasks via the menu above the tasks list.</p>
                      </li>
                      
                    </ul>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <p className='fw-bold m-0'>Notes</p>
                    
                  </AccordionSummary>
                  <AccordionDetails>
                  <ul>
                      <li><strong>How can I add a new note?</strong>
                        <p>To add a new note, click on the plus "+" icon and fill in the necessary details.</p>
                      </li>
                      <li><strong>How can I edit a note?</strong>
                        <p>To edit a note, click on it, then edit click on the title or the content to edit.</p>
                      </li>
                      <li><strong>How can I delete a note?</strong>
                        <p>To delete a note, click on the trach icon at the bottom of the note.</p>
                      </li>
                      <li><strong>How can I filter my notes?</strong>
                        <p>You can filter and sort your tasks via the menu above the notes.</p>
                      </li>
                      
                    </ul>
                  </AccordionDetails>
                </Accordion>
              </section>
  
              <section id="contact">
                <h2>Contact Us</h2>
                <ContactSupport/>
              </section>
              
            </div>
            <div>
              <section id="guide">
                <h2>Usage Guide</h2>
                <article className='card shadow p-3'>
                  <p>Follow our quick start guide to set up your account and create your first tasks.</p>
                  <a className='link-opacity-75-hover' href='#guide' onClick={()=>setShowGuide(true)}>Read the full guide</a>
                </article>
              </section>

              {showGuide && <Guide open={showGuide} onClose={()=>setShowGuide(false)}/>}
  
              
                <section id="resources">
                  <h2>Rating</h2>
                  {
                    userRating === undefined ?
                    <article className='card shadow p-3'>
      
                      <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                          setValue(newValue);
                        }}
                      />
                      <div className='mt-2'>
                        <textarea
                        className="form-control"
                        id="message"
                        name="message"
                        rows="5"
                        placeholder='Describe your experience'
                        onChange={e=>setDescription(e.target.value)}
                      ></textarea>
                      </div>
                      <button className='btn btn-outline-success mt-3' onClick={storeRating} disabled={value>0 ? false : true}>Submit</button>
                    </article>
                    :
                    <article>
                      <p className='m-0 text-body-secondary'>Thanks for your rating</p>
                      <Rating
                      readOnly
                          name="simple-controlled"
                          value={userRating.score}
                      />

                    </article>
                    
                  }
                </section>
  
            </div>
          </div>
      </div>
    );
  }
  else{
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ width: "90%" }}
      >
        <CircularProgress />
      </div>
    );
  }

};

export default Support;
