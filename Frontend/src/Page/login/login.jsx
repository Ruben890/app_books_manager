import { Link } from "react-router-dom"
import { useState } from "react"
import { authLogin } from "../../services/auth/auth.services"

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await authLogin(email, password);
    }

    return (
        <form className="form-group container" onSubmit={handleSubmit}>
            <div>
                <input
                    type="email"
                    className="form-control mt-3"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    className="form-control mt-3"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
            <p className="forgot-password">Forgot Password?</p>
            <p className="signup">Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </form>
    );
}