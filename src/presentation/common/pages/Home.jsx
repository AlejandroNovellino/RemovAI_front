//react
import { useState } from "react";
// react bootstrap imports
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
// components
import HomeMovieCard from "../components/HomeMovieCard";
import MovieInfoModal from "../components/MovieInfoModal";
// react router

// import styles
import "../styles/Landing.css";
// import custom components
import MyNavbar from "../components/MyNavbar";
// redux exports
import {
	useGetRecommendedMoviesQuery,
	useLikeMoviesMutation,
} from "../../../application/api/apiSlice";
import MyAlert from "../components/MyAlert";

function Home() {
	// redux welcome movies
	const {
		data: recommendedMovies,
		isLoading,
		isSuccess,
		isError,
		error,
		refetch,
		isFetching,
	} = useGetRecommendedMoviesQuery();
	// redux save likes
	const [likeMovies /*{ isLoadingLikeMovies }*/] = useLikeMoviesMutation();
	// use state
	const [likedMovies, setLikedMovies] = useState([]);
	const [movieToShowInfo, setMovieToShowInfo] = useState(null);
	const [show, setShow] = useState(false);
	// state for alert
	const [showAlert, setShowAlert] = useState(false);
	// error message
	const [errorMessage, setErrorMessage] = useState(
		"You might have selected a movie that you already like, we know you love it, but please select another one, we are not a huge team, decisions had to be made U-U"
	);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleMovieSelection = movie => {
		// set the movie to show info
		setMovieToShowInfo(movie);
		// show the modal
		handleShow();
	};

	const handleMovieDeselection = movie => {
		// set the movie to show info
		setMovieToShowInfo(null);
		// show the modal
		handleClose();
	};

	// login helper, onsubmit function
	const handleUserLikes = async () => {
		if (!isLoading) {
			if (likedMovies.length < 1) {
				setErrorMessage(
					"Please select a minimum of 1 movies :D we are not ChatGPT we don't do magic :c"
				);
				setShowAlert(true);
				return;
			}
			try {
				// use the kook to register the user selection
				await likeMovies(likedMovies)
					.unwrap()
					.then(() => {
						refetch();
						// set error to false
						setShowAlert(false);
						// empty the liked movies
						setLikedMovies([]);
					});
			} catch (err) {
				// print the error
				console.error("Could not register selection ", err);
				setErrorMessage(
					"You might have selected a movie that you already like, we know you love it, but please select another one, we are not a huge team, decisions had to be made U-U"
				);
				setShowAlert(true);
			}
		}
	};

	const likeMovie = likedMovie => {
		setLikedMovies([...likedMovies, likedMovie]);
		console.log(`🚀 ~ Home ~ likedMovies:`, likedMovies);
	};

	const dislikeMovie = dislikedMovie => {
		setLikedMovies([
			...likedMovies.filter(
				movie => movie.id_Pelicula !== dislikedMovie.id_Pelicula
			),
		]);
		console.log(`🚀 ~ Home ~ likedMovies:`, likedMovies);
	};

	// content to display
	let content;

	if (isLoading || isFetching) {
		content = (
			<>
				<Row className="justify-content-md-center">
					<Col xs={1}>
						<p className="h2 text-center">{`Loading`}</p>
					</Col>
					<Col xs={1}></Col>
					<Col xs={1}>
						<Spinner animation="grow" variant="light" />
					</Col>
				</Row>
			</>
		);
	} else if (isSuccess) {
		content = (
			<>
				{recommendedMovies.map((element, index) => {
					return (
						<div key={element.peliculaDeReferencia}>
							<Row>
								<p className="h2 text-center mb-3">
									{`Because you like: ${element.peliculaDeReferencia}`}
								</p>
							</Row>
							<Row className="justify-content-md-center mb-5">
								{element.peliculas.map((movie, index) => {
									return (
										<Col xs={2} key={movie.id_Pelicula}>
											<HomeMovieCard
												movie={movie}
												likedMovies={likedMovies}
												likeMovie={likeMovie}
												dislikeMovie={dislikeMovie}
												handleMovieSelection={handleMovieSelection}
											/>
										</Col>
									);
								})}
							</Row>
						</div>
					);
				})}
			</>
		);
	} else if (isError) {
		console.log(`🚀 ~ Home ~ error:`, error);
		content = (
			<div>
				<p className="h2 text-center">{`Oops! An error ocurred UwU`}</p>
			</div>
		);
	}

	let parentContainerStyle = isLoading || isFetching ? "vh-100" : "h-100";

	return (
		<Container className={parentContainerStyle}>
			<MyNavbar />

			{movieToShowInfo && (
				<MovieInfoModal
					movie={movieToShowInfo}
					show={show}
					handleClose={handleMovieDeselection}
				/>
			)}

			<Container className="">
				<Row className="my-5">
					<Col xs={12}>
						<p className="h1 text-center">
							{isLoading || isFetching
								? "Doing AI magic UwU"
								: "Recommended movies based on your likes!"}
						</p>
					</Col>
				</Row>

				{content}

				{!isLoading && (
					<>
						<Row>
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
						<Row className="pb-5">
							<Col xs={12}>
								<div className="d-grid">
									<Button
										variant="light"
										size="lg"
										className="p-2"
										onClick={handleUserLikes}>
										<i className="bi bi-arrow-down-circle-fill"></i>
										{" Save liked movies"}
									</Button>
								</div>
							</Col>
						</Row>
					</>
				)}
			</Container>

			<div className="m-0 p-0">
				<div className="homeCube"></div>
				<div className="homeCube"></div>
				<div className="homeCube"></div>
				<div className="homeCube"></div>
				<div className="homeCube"></div>
			</div>
		</Container>
	);
}

export default Home;
