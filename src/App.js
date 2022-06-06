import { useState, useEffect } from 'react';


function App() {



  const initialValue = {
    username:'',
    email:'',
    password:''
  }
  const [formValue, setFormValue] = useState(initialValue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);



  const handleChange = (e)=>{
    const { name, value } = e.target;
    setFormValue({...formValue, [name]: value}); 
  }



  const handleSubmit = (e)=>{
    e.preventDefault();
    setFormErrors(validate(formValue));
    setIsSubmit(true);
    // console.log(formValue); 
  }



  useEffect(()=>{
    // console.log(formErrors);
    if(Object.keys(formErrors).length === 0 && isSubmit){
      console.log(formValue);
    }

  }, [formErrors])



  const validate = (values)=>{
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if(!values.username){
      errors.username = "Username is required";
    }
    if(!values.email){
      errors.email = "Email is required";
    } else if(!regex.test(values.email)){
      errors.email = "This is not a valid email format"
    }
    if(!values.password){
      errors.password = "Password is required";
    } else if(values.password.length < 4){
      errors.password = "Password must be more than 4 characters"
    } else if(values.password.length > 10){
      errors.password = "Password cannot excced more than 10 characters"
    }

    return errors;
  }




  return (
    <div className="container">

      {
        Object.keys(formErrors).length === 0 && isSubmit? (
          <div className='ui message success' >Signed in successfully</div>
        ) :(
          <div></div>
        )
      }

      <form onSubmit={handleSubmit}>
        <h1>Login Form</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formValue.username}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.username}</p>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formValue.email}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.email}</p>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formValue.password}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.password}</p>
          <button className="fluid ui button blue">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default App;