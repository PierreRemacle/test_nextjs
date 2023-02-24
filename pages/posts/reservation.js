
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState, useMemo } from 'react';
import withAuth from '../api/withAuth';
import ReactDOM from "react-dom";
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from 'react-hook-form';
import styles from '../../components/layout.module.css';
import Link from 'next/link';
import AuthenticatedComponent from '../api/AuthenticatedComponent';



export default function Home() {
  
 
  const {register,formState: { errors },handleSubmit , reset} = useForm({criteriaMode: "all"});
  const router = useRouter();
  const [isAnimated, setIsAnimated] = useState(false);
  async function onSubmitForm(values) {
    let config = {
      method: 'post',
      url: `/api/form`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(values),
    }

    try {
      const response = await axios(config);
      console.log(response);
      if (response.status == 200) {
        console.log("set")
        reset();
        setIsAnimated(true);
        setTimeout(() => {
          setIsAnimated(false);
        }, 1000);
      }
    } catch (err) {}

  }

  return (
    
    <div >
      <nav className={styles.topnav}>
        
        <Link href="/">Home</Link>
        <Link href="reservation" className={styles.selected}>Reservation</Link>
        <AuthenticatedComponent>
        <Link href="transition">Transition</Link>
        <Link href="students">Students</Link>
        <Link href="ListOfReservation">Table</Link>
        </AuthenticatedComponent>
      </nav>
      <div className={styles.myfrombox}>
        <div className={`${styles.Myform} ${isAnimated ? styles.borderanimation : ""}`}>
          <form
            onSubmit={handleSubmit(onSubmitForm)}
            className="grid grid-cols-1 gap-y-6">
            <div >
              <label htmlFor="lastname" >
                Nom
              </label>
              <input
                name="lastname"
                {... register("lastname" ,{
                  required: "This input is required.", 
                })}
              />
              <ErrorMessage
                errors={errors}
                name="lastname"
                render={({ messages }) => {
                  console.log("messages", messages);
                  return messages
                    ? Object.entries(messages).map(([type, message]) => (
                        <p key={type}>{message}</p>
                      ))
                    : null;
                }}
              />
            </div>
            <div>
              <label htmlFor="firstname">
                Prénom
              </label>
              
              <input
                name="firstname"
                {... register("firstname" ,{
                  required: "This input is required.", 
                })}
              />
              <ErrorMessage
                errors={errors}
                name="firstname"
                render={({ messages }) => {
                  console.log("messages", messages);
                  return messages
                    ? Object.entries(messages).map(([type, message]) => (
                        <p key={type}>{message}</p>
                      ))
                    : null;
                }}
              />
            </div>
            <div>
              <label htmlFor="year" >
                Année
              </label>
              <select {...register("year")}>
                <option value="3eme">3eme</option>
                <option value="4eme">4eme</option>
                <option value="5eme">5eme</option>
                <option value="6eme">6eme</option>
              </select>
            </div>
            <div>
              <label htmlFor="matiere" >
                Matières
              </label>
              <select {...register("matiere")} multiple>
                <option value="Math">Math</option>
                <option value="Science">Science</option>
                <option value="Science-physique">Science-physique</option>
                <option value="Science-chimie">Science-chimie</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="email" >
                Email
              </label>
              <input
                name="email"
                {... register("email" ,{
                  required: "This input is required.",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message : "not a valid Email" }
                  })}
              />
              <ErrorMessage
                errors={errors}
                name="email"
                render={({ messages }) => {
                  console.log("messages", messages);
                  return messages
                    ? Object.entries(messages).map(([type, message]) => (
                        <p key={type}>{message}</p>
                      ))
                    : null;
                }}
              />  

            </div>
            <div>
              <label htmlFor="phone" >
                Phone
              </label>
              <input
                {... register("phone" ,{
                  required: "This input is required.",
                  pattern: {
                    value : /^(((\+|00)32[ ]?(?:\(0\)[ ]?)?)|0){1}(4(60|[789]\d)\/?(\s?\d{2}\.?){2}(\s?\d{2})|(\d\/?\s?\d{3}|\d{2}\/?\s?\d{2})(\.?\s?\d{2}){2})$/i,
                    message : " not a valid phone number"
                  }
                  })}
              />
              <ErrorMessage
                errors={errors}
                name="phone"
                render={({ messages }) => {
                  console.log("messages", messages);
                  return messages
                    ? Object.entries(messages).map(([type, message]) => (
                        <p key={type}>{message}</p>
                      ))
                    : null;
                }}
              />
            </div>
            <div>
              <label htmlFor="message" >
                Message
              </label>
              <textarea
                {... register("message" )}
              />
              
            </div>
            <div className={styles.insideregistration}>
            <button type="submit" className={`${isAnimated ? styles.coloranimation : ""}`}>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


