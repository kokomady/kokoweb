import React from 'react';
import schoolImg from '../resource/school.jpg';
import principalImg from '../resource/principal.jpg';
import '../css/ContactUsPage.css';

const ContactUsPage = () => {
  return (
    <div className="contactus-container">
      <div className="contactus-row">
        <div className="contactus-details">
          <h2 className="contactus-title">Contact Us</h2>
          <p className="contactus-desc">We'd love to hear from you! Reach out to us for any queries, feedback, or support.</p>
          <ul className="contactus-list">
            <li><strong>Address:</strong> Koko Kendriya School, Bhopal, MP, India</li>
            <li><strong>Email:</strong> info@kokoschool.edu.in</li>
            <li><strong>Phone:</strong> +91 98765 43210</li>
            <li><strong>Principal:</strong> Dr. Anil Kumar</li>
          </ul>
          <div className="contactus-principal">
            <img src={principalImg} alt="Principal" className="contactus-principal-img" />
            <span className="contactus-principal-name">Dr. Anil Kumar</span>
          </div>
        </div>
        <div className="contactus-form-col">
          <form className="contactus-form">
            <h5 className="contactus-form-title">Send us a message</h5>
            <input type="text" className="contactus-input" placeholder="Your Name" required />
            <input type="email" className="contactus-input" placeholder="Your Email" required />
            <textarea className="contactus-textarea" rows={4} placeholder="Your Message" required />
            <button type="submit" className="contactus-btn">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
