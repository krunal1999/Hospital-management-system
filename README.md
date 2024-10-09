Tech Stack - Mern Stack
Frontend - Reactjs, Redux , Javascript, tailwind Css,
Backend - Node js , Express Js , Mongo DB,

Project Description -
This was the personal project using mern stack. project name is hospital management.  it allows the patient to book an doctor appointment and take the prescription from doctor and make the payment using Strip integration. It allows doctor to schedule their Time management and appointment management, give medicine and prescription to patients , update their availability on system so that patients can only book that slots. Admin can check all the patients and doctor History, admin can check the payments and then send the medicine asked by patients.

Use Case - 

- Login and Registration Form for Doctor and Patients
- Patients About Me Information form and dashboard pages
- Doctor About me form and Availability Form with days and Time
- Patient can search for the Doctor using Searching Option, Patient can filter out Doctor based on Gender , and Department
- patients can book , cancel the appointment slots for that specific doctor
- Only one appointment for patient
- patient will get notification via Email and email will contain Add to Calendar Link, so patient can use that to add in his calendar
- when patient visit doctor , doctor can see the patient history, docker will open prescription form and medicines and notes and doctor fees then make the appointment store in database.
- Patient will get notification once the appointment is over , Now patient have to pay to receive the medicine using Stripe integration Payment
- Admin will check the payment and Send the Receipt via email and medicine.
- Patients can give the Feedback to doctor using 5 star rating form. which will be avg and displayed in doctor profile. This completed the flow.
- Admin can block or unblock the patient , so that patient cant login into system
- Every Doctor after registration need to be approved by the Doctor, then only doctor will be available in the search
- Admin can Make doctor unavailable or available by dashboard
- admin dashboard will have chart for analytics
- For Security - i am using Jwt Token for role Based access / login , i am encrypting the password using js library bycypt and then save in database
- i have developed the Time Slot Scheduling Algorithm for the Doctor , depending on the weekdays and Start time  and end Time, each slot is of 30 min. Doctor also has break time, so break time is exclude from the Appointments slot
- I have build beautiful UI for home page, about us, contact us pages  mobile friendly UI
