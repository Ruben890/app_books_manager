import { Navigate } from "react-router";


export const ProtectRouter = ({ user, children, redirectTo }) => {


    if (!user) {
        return <Navigate to={redirectTo} />;
    }

    return children;
};
