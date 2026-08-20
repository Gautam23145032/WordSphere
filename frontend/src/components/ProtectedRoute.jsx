    import { useEffect, useState } from "react";
    import { Navigate } from "react-router-dom";

    import { getProfile } from "../services/authApi";

    export default function ProtectedRoute({
    children,
    }) {

    const [loading, setLoading] =
        useState(true);

    const [authenticated,
        setAuthenticated] =
        useState(false);

    useEffect(() => {

        async function verifyUser() {

        const token =
            localStorage.getItem("token");

        if (!token) {
            setLoading(false);
            return;
        }

        try {

            await getProfile();

            setAuthenticated(true);

        } catch (error) {

            localStorage.removeItem("token");

            setAuthenticated(false);

        } finally {

            setLoading(false);

        }

        }

        verifyUser();

    }, []);

    if (loading) {

        return <h2>Loading...</h2>;

    }

    if (!authenticated) {

        return (
        <Navigate
            to="/login"
            replace
        />
        );

    }

    return children;

    }