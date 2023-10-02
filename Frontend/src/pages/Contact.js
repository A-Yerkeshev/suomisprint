// src/components/Contact.js

import { useState } from 'react';
import '../styles/Contact.css';

function Contact(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [comments, setComments] = useState('');
  
  const companyName = 'Suomiprint';
  const companyAddress = 'Myllypurontie 22, Helsinki, Finland';
  const contactNumber = '+358 098-123-456';

  const onSubmit = e => {
    e.preventDefault();
    const contactUsInformation = {
      name,
      email,
      phone,
      comments,
      submittedOn: new Date()
    };

    console.log(contactUsInformation);
    setName('');
    setEmail('');
    setPhone('');
    setComments('');
  
  };

  return (
    <div className="contact-container">
    <div className="contact-form-container">
      <h2>Contact Us</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor='name'>Name:</label>
          <input
            id='name'
            type='text'
            onChange={e => setName(e.target.value)}
            value={name}
          />
        </div>
        <div>
          <label htmlFor='email'>Email:</label>
          <input
            id='email'
            type='text'
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div>
          <label htmlFor='phone'>Phone:</label>
          <input
            id='phone'
            type='text'
            onChange={e => setPhone(e.target.value)}
            value={phone}
          />
        </div>
        <div>
          <label htmlFor='comments'>Comments:</label>
          <textarea
            id='comments'
            name='comments'
            onChange={e => setComments(e.target.value)}
            value={comments}
          />
        </div>
        <button className="btn-submit">Submit</button>
      </form>
        <div>
          <h3> Company Information</h3>
          <p>Company Name: {companyName}</p>
          <p>Company Address: {companyAddress}</p>
          <p>Contact Number:{contactNumber}</p>
        </div>
       
    </div>
    </div>
  );
}


export default Contact;
  
