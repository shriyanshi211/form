import { useState } from "react";
import "./App.css";
import FormInput from "./components/FormInput";
import Axios from 'axios';


const App = () => {
  const url='https://collegeranker-query-default-rtdb.firebaseio.com/userQueryrecords.json'
  const [isSubmit, setIsSubmit] = useState(false);
  const [values, setValues] = useState({
    username: "",
    email: "",
    crnnumber: "",
    mobile: "",
    internshipduration: "",
    query:" ",
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "crnnumber",
      type: "text",
      placeholder: "CrnNumber",
      label: "CRNNumber",
      required: true,
    },
    {
      id: 4,
      name: "mobile",
      type: "text",
      placeholder: "Mobile",
      errorMessage:
        "Should be a 10 digit number!",
      label: "Mobile",
      
    },
    {
      id: 5,
      name: "internshipduration",
      type: "text",
      placeholder: "Internship Duration",
      label: "Internship Duration",
      required: true,
    },
    {
      id: 6,
      name: "query",
      type: "text",
      placeholder: "Query",
      label: "Query",
      required: true,
    },
  ];

  const submit = (e) => {
    e.preventDefault();
    Axios.post(url,{
    username: values.username,
    email: values.email,
    crnnumber: values.crnnumber,
    mobile: values.mobile,
    internshipduration: values.internshipduration,
    query: values.query,
    })
    .then(res=>{
      console.log(res.values)
    })
    setIsSubmit(true);
    
    
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="app">
       <form onSubmit={(e)=>submit(e)}>
       {isSubmit ? <div className="success-message">You will be contacted by team within 24 hours!</div>: null}
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button>Submit</button>
      </form>
    </div>
  );
};

export default App;