import { useState } from "react";
import API from "../services/api";
import { useSearchParams } from "react-router-dom";

export default function Onboard() {
  const [password, setPassword] = useState("");
  const [params] = useSearchParams();
  const token = params.get("token");

  const handleSubmit = async () => {
    try {
      await API.post("auth/onboard/", { token, password });
      alert("Account created");
    } catch {
      alert("Error");
    }
  };

  return (
    <div>
      <h2>Set Password</h2>
      <input type="password" onChange={(e)=>setPassword(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}