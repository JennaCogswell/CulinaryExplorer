"use client";

/**
 * @Author Vrishti Dawra (B00906945)
 */

import React, { useState } from "react";

const ContactSection = () => {
  const inputStyle = {
    backgroundColor: "#A4A291",
  };
  const buttonStyle = {
    backgroundColor: "#A3865E",
  };
  const headerStyle = {
    color: "#724110",
  };

  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [emailError, setEmailError] = useState("");
  const [subjectError, setSubjectError] = useState("");
  const [messageError, setMessageError] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleEmailChange = (e) => {
    setEmail(e.target.value);

    setEmailError(
      e.target.value && !emailRegex.test(e.target.value)
        ? "Invalid email address"
        : ""
    );
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    let isFormValid = true;

    if (!email || !emailRegex.test(email)) {
      setEmailError("Please enter a valid Email Address.");
      isFormValid = false;
    } else {
      setEmailError("");
    }

    if (!subject) {
      setSubjectError("Please enter Subject.");
      isFormValid = false;
    } else {
      setSubjectError("");
    }

    if (!message) {
      setMessageError("Please enter a meaningful Message.");
      isFormValid = false;
    } else {
      setMessageError("");
    }

    console.log("Form Valid?", isFormValid);
    if (isFormValid) {
      try {
        const response = await fetch("/api/addquery", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            subject,
            message,
          }),
        });

        console.log("Response:", response);

        if (response.ok) {
          setEmail("");
          setMessage("");
          setSubject("");
          alert("Message was delivered successfully!!");
        } else {
          throw new Error("Failed to submit message.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Failed to submit message. Please try again later.");
      }
    }
  };

  return (
    <div id="contact" className="">
      <div className="w-full max-w-lg">
        <form className="bg-white rounded px-8 pb-8 mb-4">
          <h2 className="text-2xl mb-3" style={headerStyle}>
            Contact
          </h2>
          <div className="mb-4">
            <input
              style={inputStyle}
              className="rounded-lg w-full py-2 px-3 leading-tight placeholder-black focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
            {emailError && (
              <p className="text-red-500 text-xs italic">{emailError}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              style={inputStyle}
              className="rounded-lg w-full py-2 px-3 leading-tight placeholder-black focus:outline-none focus:shadow-outline"
              id="subject"
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={handleSubjectChange}
            />
            {subjectError && (
              <p className="text-red-500 text-xs italic">{subjectError}</p>
            )}
          </div>
          <div className="mb-4">
            <textarea
              style={inputStyle}
              className="shadow appearance-none rounded-lg w-full py-2 px-3 placeholder-black leading-tight focus:outline-none focus:shadow-outline h-32 resize-none"
              id="message"
              placeholder="Enter Text..."
              value={message}
              onChange={handleMessageChange}
            ></textarea>
            {messageError && (
              <p className="text-red-500 text-xs italic">{messageError}</p>
            )}
          </div>
          <div className="mt-auto">
            <button
              style={buttonStyle}
              onClick={handleSubmit}
              className="border py-2 px-4 rounded-lg float-right"
              type="submit"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactSection;
