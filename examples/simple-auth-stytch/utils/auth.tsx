import {useCallback, useEffect} from "react";
import {useStytchUser} from "@stytch/nextjs";
import {useRouter} from "next/navigation";

/**
 * A higher-order component that enforces a login requirement for the wrapped component.
 * If the user is not logged in, the user is redirected to the login page and the
 * current URL is stored in localStorage to enable return after authentication.
 */
export const withLoginRequired = (Component: React.FC) => () => {
    const { user, fromCache, isInitialized } = useStytchUser();
    const router = useRouter();

    useEffect(() => {
        console.log(user, fromCache, isInitialized);
        if (!user && !fromCache && isInitialized) {
            localStorage.setItem('returnTo', window.location.href);
            router.push('/login');
        }
    }, [user, fromCache, isInitialized]);

    if (!user) {
        return null;
    }
    return <Component />;
};

/**
 * The other half of the withLoginRequired flow
 * Redirects the user to a specified URL stored in local storage or a default location.
 * Behavior:
 * - Checks for a `returnTo` entry in local storage to determine the redirection target.
 * - If `returnTo` exists, clears its value from local storage and navigates to the specified URL.
 * - If `returnTo` does not exist, redirects the user to the default '/home' location.
 */
export const useOnLoginComplete = () => {
    const router = useRouter();

    return useCallback(() => {
        const returnTo = localStorage.getItem('returnTo');
        if (returnTo) {
            localStorage.setItem('returnTo', '');
            router.push(returnTo);
        } else {
            router.push('/');
        }
    }, [router]);
}