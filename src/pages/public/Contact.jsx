import { useState } from "react";
import conf from "../../config/config";
import authenticationService from "../../services/AuthenticationService";
import { toast } from "react-toastify";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, subject, message);
    sendBookingMail();
    setEmail("");
    setSubject("");
    setMessage("");
  };

  const sendBookingMail = async () => {
    const options = {
      from: conf.sendigFrom,
      to: email,
      subject: subject,
      text: message,
    };

    const res = await authenticationService.sendMails(options);
    if (res.status === 200) {
      toast.success("Email Send Thank You");
    }
  };

  return (
    <section>
      <div className="px-4 mx-auto max-w-screen-md">
        <h2 className="heading text-center ">Contact Us</h2>
        <p className="mb-8 lg:mb-16 font-light text-center text__para">
          Got a technical issue? Want to send feedback about a beta feature? Let
          us know.
        </p>
        <form action="#" className="space-y-8">
          <div>
            <label htmlFor="email" className="form__label ">
              Your email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              className="form__input mt-1"
              placeholder="example@gmail.com"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="subject" className="form__label ">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              value={subject}
              className="form__input  mt-1"
              placeholder="Let us know how we can help you"
              required
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="form__label">
              Your message
            </label>
            <textarea
              id="message"
              rows="6"
              value={message}
              className="form__input  mt-1"
              placeholder="Leave a comment..."
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <button onClick={handleSubmit} className="btn  rounded  sm:w-fit  ">
            Send message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
