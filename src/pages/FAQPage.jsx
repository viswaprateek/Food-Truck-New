import React, { useState } from 'react';

function FAQPage() {
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can handle the submission of the message, for example, sending it to a server or displaying it.
    console.log('Message submitted:', message);
    // Clear the message box after submission
    setMessage('');
    // Show pop-up message
    alert('Message sent!');
  };

  return (
    <div style={styles.container}>
      <h1>Frequently Asked Questions</h1>
      <div style={styles.faq}>
        <h2>How do I place an order?</h2>
        <p>To place an order, simply browse through the available food trucks on our app, select the items you'd like to order, and proceed to checkout. It's quick and easy!</p>

        <h2>Do you offer delivery?</h2>
        <p>Yes, we offer delivery services for select food trucks. During the checkout process, you'll have the option to choose delivery or pickup based on your preference.</p>

        <h2>Can I track my order?</h2>
        <p>Yes, you can track your order in real-time using our app. Once your order is confirmed, you'll receive updates on its status, including when it's being prepared, out for delivery, and delivered to your doorstep.</p>
      </div>

      <div style={styles.messageBox}>
        <h2>Still have a question?</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            rows="4"
            cols="50"
            placeholder="Type your message here..."
            value={message}
            onChange={handleChange}
            style={styles.textarea}
          />
          <br />
          <button type="submit" style={styles.button}>Submit</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  faq: {
    marginBottom: '40px',
  },
  messageBox: {
    backgroundColor: '#464746',
    padding: '20px',
    borderRadius: '8px',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginBottom: '10px',
    resize: 'none',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default FAQPage;
