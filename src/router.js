// packages imports
import { createBrowserRouter } from "react-router-dom";
// Components and pages imports
import ErrorInfo from "./presentation/common/pages/ErrorInfo";
import Landing from "./presentation/common/pages/Landing";
import Home from "./presentation/common/pages/Home";
import Welcome from "./presentation/common/pages/Welcome";
import SignIn from "./presentation/common/pages/SignIn";

// router creation
export const router = createBrowserRouter([
	{
		path: "/",
		element: <Landing />,
		errorElement: <ErrorInfo />,
	},
	{
		path: "/sign-in",
		element: <SignIn />,
		errorElement: <ErrorInfo />,
	},
	{
		path: "/welcome",
		element: <Welcome />,
		errorElement: <ErrorInfo />,
	},
	{
		path: "/home",
		element: <Home />,
		errorElement: <ErrorInfo />,
	},
]);
