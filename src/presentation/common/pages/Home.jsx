//react
import { useState } from "react";
// react bootstrap imports
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
// components
import MovieCard from "../components/MovieCard";
// react router

// import styles
import "../styles/Landing.css";
// import custom components
import MyNavbar from "../components/MyNavbar";
// redux exports
import { useGetRecommendedMoviesQuery } from "../../../application/api/apiSlice";

function Home() {
	// redux welcome movies
	const {
		data: movies,
		isLoading,
		isSuccess,
		isError,
		error,
	} = useGetRecommendedMoviesQuery();
	// use effect
	const [currentMovie, setCurrentMovie] = useState(0);

	// login helper, onsubmit function
	const handleUserSelection = async () => {
		if (!isLoading) {
			try {
				// use the kook to register the user selection
				//
				// sig-in possible so go to home
				setCurrentMovie(currentMovie + 1);
			} catch (err) {
				// print the error
				console.error("Could not register selection ", err);
			}
		}
	};

	// content to display
	let content;

	if (isLoading) {
		content = <Spinner animation="grow" variant="light" />;
	} else if (isSuccess) {
		content = <MovieCard movie={movies[currentMovie]} />;
	} else if (isError) {
		content = <div>{error.toString()}</div>;
	}

	let aux = (
		<Row className="justify-content-md-center">
			<Col xs={1}>
				<Button variant="dark" onClick={handleUserSelection}>
					<i className="bi bi-google"></i>
					{" Google"}
				</Button>
			</Col>
			<Col xs={10}>{content}</Col>
			<Col xs={1}>
				<Button variant="light" onClick={handleUserSelection}>
					<i className="bi bi-google"></i>
					{" Google"}
				</Button>
			</Col>
		</Row>
	);
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

			<Container className="py-5">
				<Row className="my-5">
					<Col xs={12}>
						<p className="h1 text-center">
							Likes registered you can now use the recommendation system!
						</p>
					</Col>
				</Row>
				<Row>
					<Col xs={12}>
						<div className="d-grid">
							<Button variant="light" size="lg" className="p-4">
								<i className="bi bi-arrow-down-circle-fill"></i>
								{" Start recommending"}
							</Button>
						</div>
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default Home;
