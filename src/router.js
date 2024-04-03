// packages imports
import { createBrowserRouter } from "react-router-dom";
import App from "./presentation/common/pages/App";
// Components and pages imports
import ErrorInfo from "./presentation/common/pages/ErrorInfo";

// router creation
export const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorInfo />,
	},
]);
