import React from 'react';

function WaitlistForm(props) {

  const clearForm = () => {
    console.log('form cleared');
    document.getElementById("waitlist-form-first-name").value = "";
    document.getElementById("waitlist-form-last-name").value = "";
    document.getElementById("waitlist-form-email").value = "";
    document.getElementById("waitlist-form-phone").value = "";
  }

  return (
    <div id="waitlist-form">
      <div className="waitlist-form-container" id="waitlist-form-container-top">
        <label htmlFor="waitlist-form-first-name" className="waitlist-form-label">
          First Name
        </label>
        <input
          type="text"
          name="waitlist-form-first-name"
          id="waitlist-form-first-name"
          className="waitlist-form-input"
          // value="true"
          // onChange={this.handleInputChange}
          required
        />
      </div>
      <div className="waitlist-form-container">
        <label htmlFor="waitlist-form-last-name" className="waitlist-form-label">
          Last Name
        </label>
        <input
          type="text"
          name="waitlist-form-last-name"
          id="waitlist-form-last-name"
          className="waitlist-form-input"
          // value="true"
          // onChange={this.handleInputChange}
          required
        />
      </div>
      <div className="waitlist-form-container">
        <label htmlFor="waitlist-form-email" className="waitlist-form-label">
          Email
        </label>
        <input
          type="email"
          name="waitlist-form-email"
          id="waitlist-form-email"
          className="waitlist-form-input"
          // value="true"
          // onChange={this.handleInputChange}
          required
        />
      </div>
      <div className="waitlist-form-container" id="waitlist-form-container-bottom">
        <label htmlFor="waitlist-form-phone" className="waitlist-form-label">
          Phone Number
        </label>
        <input
          type="email"
          name="waitlist-form-phone"
          id="waitlist-form-phone"
          className="waitlist-form-input"
          // value="true"
          // onChange={this.handleInputChange}
          required
        />
      </div>
      <div id="waitlist-form-button-container">
        <button type="submit" value="Submit" className="waitlist-form-input" id="waitlist-form-button" onClick={clearForm}>Submit</button>
      </div>
    </div>
  )
}

export default WaitlistForm;
