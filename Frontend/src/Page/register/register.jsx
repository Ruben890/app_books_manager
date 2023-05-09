import { authRegister } from "../../services/auth/auth.services"
import { useState } from "react"
export const Register = () => {
    const [errorMessage, setErrorMessage] = useState("");

    const hendlerSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        const userRegister = Object.fromEntries(formData)
        const response = await authRegister(userRegister)
        if (response.errorMessage) {
            setErrorMessage(response.errorMessage);
        } else {
            window.location.href = '/login'
        }

    }


    return (
        <>
            <div className="container">
                <form className="form-group" onSubmit={hendlerSubmit} encType="multipart/form-data">
                    <div>
                        <input type="text" className="form-control mt-3 mb-3" placeholder="first name" name="first_name" />
                        <input type="text" className="form-control mt-3 mb-3" placeholder="last name" name="last_name" />
                        <input type="text" className="form-control mt-3 mb-3" placeholder="username" name="username" />
                        <input type="email" className="form-control mt-3 mb-3" placeholder="email" name="email" />
                        <input type="password" className="form-control mt-3 mb-3" placeholder="password" name="password" />
                        <input type="password" className="form-control mt-3 mb-3" placeholder="confirm password" />
                        {errorMessage && <p className="text-danger">{errorMessage}</p>}
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
            </div>
        </>
    )
}