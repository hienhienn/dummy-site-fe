import { useEffect, useState } from "react";
import "./Login.scss"
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { checkValidToken } from "../utils";

const Login = () => {
  const [value, setValue] = useState(["", "", "", ""])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const onChangeInput = (event, element) => {
    let tmp = [...value];
    tmp[element] = event.target.value.slice(-1);
    setValue(tmp);

    if(element < 3 && tmp[element].length) {
      nextInput(element);
    }
  }

  const onKeyDown = (event, element) => {
    if(event.keyCode === 39 && element < 3) {
      nextInput(element)
    }
    if(event.keyCode === 13) {
      handleSubmit()
    }
  }

  const nextInput = (index) => {
    const nextfield = document.querySelector(
      `input[name=number-${index + 1}]`
    );
    // If found, focus the next field
    if (nextfield !== null) {
      nextfield.focus();
    }
  }

  const handleSubmit = () => {
    if(loading) return
    const password = value.join("")
    if(password.length < 4) return;

    let form = new FormData();
    form.append("password", password);
    setLoading(true)
    fetch(`${process.env.REACT_APP_API_URL}/auth/token`, {
      method: 'POST',
      body: form
    })
      .then(res => res.json())
      .then(res => {
        if(res.detail) toast.error(res.detail)
        else {
          localStorage.setItem("accessToken", res.access_token)
          localStorage.setItem("accessTime", new Date().getTime())
          toast.success("Login successfully!")
          setTimeout(() => navigate("/"), 100)
        }
      })
      .catch(() => {
        console.log('error')
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if(checkValidToken()) navigate("/")
  }, [])

  return (
    <div className="login-container">
      <div className="inputs">
        {[0, 1, 2, 3].map(element => (
          <input 
            key={element}
            name={`number-${element}`}
            value={value[element]} 
            type="number" 
            min={0} 
            max={9} 
            onChange={(event) => onChangeInput(event, element)}
            onKeyDown={(event) => onKeyDown(event, element)}
          />
        ))}
      </div>

      <button className="login-btn" onClick={handleSubmit}>Đăng nhập</button>
    </div>
  )
}
export default Login