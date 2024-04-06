// packages imports
import { createBrowserRouter } from "react-router-dom";
// Components and pages imports
import ErrorInfo from "./presentation/common/pages/ErrorInfo";
import Landing from "./presentation/common/pages/Landing";

// router creation
export const router = createBrowserRouter([
	{
		path: "/",
		element: <Landing />,
		errorElement: <ErrorInfo />,
	},
]);
