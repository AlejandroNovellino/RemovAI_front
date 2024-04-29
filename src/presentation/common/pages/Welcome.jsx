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

function Welcome() {
	// redux welcome movies
	const {
		data: welcomeMovies,
		isLoading,
		isSuccess,
		isError,
		error,
	} = useGetWelcomeMoviesQuery();
	// react router
	const navigate = useNavigate();
	// use effect
	const [likedMovies, setLikedMovies] = useState([]);

	// login helper, onsubmit function
	const handleConfirmSelection = async () => {
		if (!isLoading) {
			try {
				// use the kook to register user selection, user liked movies
				//
				// sig-in possible so go to home
				navigate("/home");
			} catch (err) {
				// print the error
				console.error("Could not register selection ", err);
			}
		}
	};

	const likeMovie = likedMovie => {
		setLikedMovies([...likedMovies, likedMovie]);
	};

	const dislikeMovie = dislikedMovie => {
		setLikedMovies([
			...likedMovies.filter(movie => movie.id !== dislikedMovie.id),
		]);
	};

	// content to display
	let content;

	if (isLoading) {
		content = <Spinner animation="grow" variant="light" />;
	} else if (isSuccess) {
		content = welcomeMovies.map(movie => (
			<Col key={movie.id}>
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
