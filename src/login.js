import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { setUserSession, userLogin, getToken, getRefreshToken } from './Utils/Common';
import './login.css';
import Paqqets from './sendPaqqets';
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as jwt_decode from "jwt-decode";
import { Spinner } from 'react-bootstrap';
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";


function validate(emailAddress, password) {
  return {
    emailAddress: emailAddress.length === 0,
    password: password.length === 0,
  };
}
var Eye = <FontAwesomeIcon className="icon" icon={faEye} />;
var EyeSlash = <FontAwesomeIcon className="icon" icon={faEyeSlash} />;

export default function Login(props) {
const [emailAddress, setEmailAddress]= useState('');
const [password, setPassword]=useState('');
const [isloggedin,setIsloggedIn]=useState(false);
const [loading, setLoading]=useState(false);
const [invalidmessage, setInvalidMessage]=useState(false);
const [errorMessage,setErrorMessage] = useState("");
const [isValid, setIsvalid]=useState(false);
const [isChecked,setIschecked]=useState(false);
const [touched,setTouched]=useState([{emailAddress: false,password:false}]);
const [passwordShown,setPasswordshown]=useState(false);
const [PaqqetMultipleOrgList, setPaqqetMultipleOrgList]=useState([]);
const [paqqetMultipleOrg,setPaqqetMultipleOrg]=useState(false);
const [getPaqqetOrgValue,setGetPaqqetOrgValue]=useState('');
const sessionExpiryAt = 60 * 1;
const expiresAt = 60 * 2;
let date = new Date();

  useEffect(() => {
    if (localStorage.checkbox && localStorage.username !== "") {
      setIschecked(true);
        setEmailAddress(localStorage.username);
    }
 
}, [0]);
function handleCookie() {
  if (!isChecked) {
    date.setTime(date.getTime() + (sessionExpiryAt * 60 * 1000));
    props.setCookie("RefreshToken", getRefreshToken(), {
      path: "/", expires: date
    });
  }
  else {
    date.setTime(date.getTime() + (expiresAt * 60 * 1000));
    props.setCookie("RefreshToken", getRefreshToken(), {
      path: "/", expires: date
    });
  }
}
const handleKeepSignedIn = () => {
  if (isChecked === false) {
    setIschecked(true);
  }
  else {
    setIschecked(false);
  }
}
 const handleEmail=(event)=> {
   setEmailAddress(event.target.value);
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if (event.target.value !== '') {
      if (!pattern.test(event.target.value.trim())) {
        setIsvalid(true);
        setInvalidMessage(false);
      } else {
        setIsvalid(false);
      }
    } else {
      setIsvalid(false);
    }

    localStorage.username = event.target.value
  }
  const handlePassword=(event)=> {
    
    if(event.target.value.trim() !==""){
      setInvalidMessage(false);
    }
    setPassword(event.target.value.trim());
   
  }
  const handleBlur = (field) => (event) => {
  setTouched(true)
  }
  const onChangeCheckbox=(event)=> {
    setIschecked(event.target.checked);
   
    localStorage.checkbox = event.target.checked
  }
  const togglePasswordVisiblity=  () =>{
    if (passwordShown === false) {
      setPasswordshown(true);
    }
    if (passwordShown === true) {
      setPasswordshown(false);
    }
  };
  const handleLogin = (event) => {
  setInvalidMessage(false);

    if (isChecked === true && emailAddress !== "") {
      localStorage.username = emailAddress
      localStorage.checkbox = isChecked
      // localStorage.password = password
    }
    if (emailAddress !== '') {
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(emailAddress)) {
       setIsvalid(true);
      } else {
        setLoading(true);
        var user = {
          emailAddress: emailAddress,
          password: password
        }
        var MultiplePaqqetUserLoginPayLoad = {
          emailAddress: emailAddress,
          password: password,
          orgId: getPaqqetOrgValue,
        }
        axios.post('https://api.paqqets.com/demo/v1/token', getPaqqetOrgValue === "" ? user : MultiplePaqqetUserLoginPayLoad).then(response => {
          setUserSession(response.idtoken);
          localStorage.setItem('IdToken', response.data.idToken)
          const authtoken = localStorage.getItem('IdToken');
          const decode = jwt_decode(authtoken);
          const userLogedIn = decode.sub;
          localStorage.setItem('userID', userLogedIn);
          localStorage.setItem("orgId",getPaqqetOrgValue)
    
          localStorage.setItem('user', response.data.userName);
          userLogin(response.data.idToken)
          if (getToken()) {
            if (response.idToken !== null) {
              localStorage.setItem("RefreshToken", response.data.refreshToken);
              handleCookie();
            setIsloggedIn(true);
            setLoading(false);
            }
          }
        }).catch(error => {
          if (error.response.status === 422) {
            if (error.response.data.orgDetails !== undefined) {
             
              setPaqqetMultipleOrgList(error.response.data.orgDetails);
              setGetPaqqetOrgValue(error.response.data.orgDetails[0].orgId);
              setPaqqetMultipleOrg(true);
            }
            else {
              setInvalidMessage(true);
              setLoading(false);
            }
          }
          setInvalidMessage(true);
          setErrorMessage(error.response.data.errors[0].message)
          setLoading(false);
        });
      }
    }
  }
  const  handlePaqqetOrgChange = (event) => {
    const PaqqetOrgValue = event.target.value;
    setGetPaqqetOrgValue(PaqqetOrgValue);
  }
  const canBeSubmitted=() =>{
    const errors = validate(emailAddress, password);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  }
 const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);

    const handleChange = e => {
      setValue(e.target.value);
    }
    return {
      value,
      onChange: handleChange
    }
  }
  
  


  useEffect(() => {
    if (isloggedin) {
      return <Paqqets />
    } else {
      const errors = validate(emailAddress, password);
      const isDisabled = Object.keys(errors).some(x => errors[x]);

      const shouldMarkError = (field) => {
        const hasError = errors[field];
        const shouldShow = touched[field];

        return hasError ? shouldShow : false;
      };
    }
  }, [0]);
  if (isloggedin) {
    return <Paqqets />
  } else {
      return (
        <div className="card-wid">
          <div className="header">
            <img className="logo-img" src={require('./paqqet-logo.png')} />
          </div>
          <div className="card-div">
            <h5 className="signin-label">Sign In</h5>
            {/* <form onSubmit={handleSubmit()}> */}
            <form>
              <div>
                <label className="control-label"> Email Address </label>
                <input
                  id="form-control"
                  type="text" name="emailAddress" value={emailAddress} onChange={handleEmail}
                  onBlur={handleBlur('emailAddress')}
                   required />
              </div>
              {isValid && <div className="error-msg"> Please enter  valid email address</div>}
              <div style={{ marginTop: 10 }}>
                <label className="control-label"> Password </label>
                <div className="row">

                  <input
                  className="password-field"
                 value={password} name="password" type={passwordShown ? "text" : "password"}
                  onBlur={handleBlur('password')}
                  onChange={handlePassword}  required />
                  <span className="password-icon">{passwordShown ? <i  onClick={togglePasswordVisiblity}>{Eye}</i> : <i  onClick={togglePasswordVisiblity}>{EyeSlash}</i>}</span>
                </div>
               
              </div>
              {paqqetMultipleOrg &&
              <div className="mb-4" style={{ marginTop: 10 }}>
                          
                          <select id="form-control"required="required" onChange={handlePaqqetOrgChange} value={getPaqqetOrgValue}>
                            {PaqqetMultipleOrgList.map((result =>
                              (<option value={result.orgId} key={result.orgId}>{result.orgName}</option>)))}
                          </select>
              </div> }
              <div>
                <div className="form-row remember-span">
                  <div className="form-group col-xs-2">
                    <input className="checkbox rem" type="checkbox" checked={isChecked} onChange={handleKeepSignedIn} />
                  </div>
                  <label className="remember">Keep signed in</label>
                  {loading && <div className="form-group col-xs-4">
                    <button type="button" className="sign-dis btn-log btn-rounded navbar-btns" disabled={loading} onClick={handleLogin}><Spinner animation="border" role="status" className="spins">
                    </Spinner>SignIn</button> <br />
                  </div>}
                  {!loading && <div className="form-group col-xs-6">
                    <input type="button" className="sign-btn btn-log btn-rounded navbar-btn remember" value={loading ? 'SignIn..' : 'Sign In'} disabled={isValid || password === ""} onClick={handleLogin} /><br />
                  </div>}
                  {/* {invalidmessage && <div className="error-msg invalid">Invalid sign-in credentials</div>} */}
                  {errorMessage && <div className="error-msg invalid">{errorMessage}</div>}
                </div>

                <div className="form-row register-tog">

                  <div className="form-group col-xs-5 ">

                    <a href="https://send.paqqets.com/forgotpassword"
                      target="blank">

                      <FontAwesomeIcon icon={faQuestionCircle} />
                      <span style={{ marginleft: 1 }}> Forgot
              Password</span></a>

                  </div>


                  <div className="form-group col-xs-7 register-div">

                    <a className="register-now"
                      href="https://stage.paqqets.com/pricing"
                      target="blank">

                      {/* <FontAwesomeIcon icon={faPlus} /> */}
                      <i className="fas fa-plus" ></i>
                      <span className="register-span">Register Now</span></a>

                  </div>

                </div>
              </div>

            </form>
          </div>
          {/* <input type="button" className="btn btn-primary btn-rounded navbar-btn" value={loading? 'Loading..' : 'Sign In'} disabled={loading} onClick={this.handleLogin}  /><br /> */}
          <div className="footer">

          <p className="copy-right"> © {new Date().getFullYear()} Paqqets, LLC | All Rights Reserved.</p>

          </div>
        </div>

      );
  }
  
}