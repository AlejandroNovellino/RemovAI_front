//react
import { useState } from "react";
// react bootstrap imports
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
// components
import WelcomeMovieCard from "../components/WelcomeMovieCard";
// react router
import { useNavigate } from "react-router-dom";
// import styles
import "../styles/Landing.css";
// import custom components
import MyNavbar from "../components/MyNavbar";
// redux exports
import { useGetWelcomeMoviesQuery } from "../../../application/api/apiSlice";
import { useLikeMoviesMutation } from "../../../application/api/apiSlice";
import MyAlert from "../components/MyAlert";

function Welcome() {
	// redux welcome movies
	const {
		data: welcomeMovies,
		isLoading,
		isSuccess,
		isError,
		error,
	} = useGetWelcomeMoviesQuery();
	const [likeMovies, { isLoadingLikeMovies }] = useLikeMoviesMutation();
	// react router
	const navigate = useNavigate();
	// use state
	const [likedMovies, setLikedMovies] = useState([]);
	// state for alert
	const [showAlert, setShowAlert] = useState(false);
	// error message
	let [errorMessage, setErrorMessage] = useState(
		"Please select a minimum of 3 movies :D we are not ChatGPT we don't do magic :c"
	);

	// login helper, onsubmit function
	const handleConfirmSelection = async () => {
		if (!isLoadingLikeMovies) {
			if (likedMovies.length < 3) {
				setShowAlert(true);
				return;
			}
			try {
				// use the kook to register user selection, user liked movies
				await likeMovies(likedMovies).unwrap();
				// set error to false
				setErrorMessage(
					"Please select a minimum of 3 movies :D we are not ChatGPT we don't do magic :c"
				);
				setShowAlert(false);
				// movies liked possible so go to home
				navigate("/home");
			} catch (err) {
				// print the error
				console.error("Could not register selection ", err);
				setErrorMessage("Oops something really abd happened :c");
				setShowAlert(true);
			}
		}
	};

	const likeMovie = likedMovie => {
		setLikedMovies([...likedMovies, likedMovie]);
	};

	const dislikeMovie = dislikedMovie => {
		setLikedMovies([
			...likedMovies.filter(
				movie => movie.id_pelicula !== dislikedMovie.id_pelicula
			),
		]);
	};

	// content to display
	let content;

	if (isLoading) {
		content = <Spinner animation="grow" variant="light" />;
	} else if (isSuccess) {
		content = welcomeMovies.map(movie => (
			<Col key={movie.id_pelicula}>
				<WelcomeMovieCard
					movie={movie}
					likedMovies={likedMovies}
					likeMovie={likeMovie}
					dislikeMovie={dislikeMovie}
				/>
			</Col>
		));
	} else if (isError) {
		content = <div>{error.toString()}</div>;
	}

	return (
		<>
			<MyNavbar />
			<div className="m-0 p-0">
				<div className="cube"></div>
				<div className="cube"></div>
				<div className="cube"></div>
				<div className="cube"></div>
				<div className="cube"></div>
			</div>

			<Container className="pb-4">
				<Row className="row-cols-md-3 g-4">{content}</Row>
				<Row className="mt-4">
					<Col xs={12}>
						{showAlert && (
							<MyAlert
								headingMessage={"Oh no!"}
								message={errorMessage}
								setShow={setShowAlert}
							/>
						)}
					</Col>
				</Row>
				<Row className="my-4">
					<div className="d-grid">
						<Button variant="light" size="lg" onClick={handleConfirmSelection}>
							Confirm selection
						</Button>
					</div>
				</Row>
			</Container>
		</>
	);
}

export default Welcome;
