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
	console.log(`🚀 ~ Home ~ recommendedMovies:`, recommendedMovies);

	// redux save likes
	const [likeMovies /*{ isLoadingLikeMovies }*/] = useLikeMoviesMutation();
	// use state
	const [likedMovies, setLikedMovies] = useState([]);
	const [movieToShowInfo, setMovieToShowInfo] = useState(null);
	const [show, setShow] = useState(false);

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
			try {
				// use the kook to register the user selection
				await likeMovies(likedMovies)
					.unwrap()
					.then(() => {
						refetch();
					});
				// empty the liked movies
				setLikedMovies([]);
			} catch (err) {
				// print the error
				console.error("Could not register selection ", err);
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
						<>
							<Row key={element.peliculaDeReferencia}>
								<p className="h2 text-center mb-3">
									{`Because you like: ${element.peliculaDeReferencia}`}
								</p>
							</Row>
							<Row className="justify-content-md-center mb-5">
								{element.peliculas.map((movie, index) => {
									return (
										<>
											<Col xs={2} key={movie.id_Pelicula}>
												<HomeMovieCard
													movie={movie}
													likedMovies={likedMovies}
													likeMovie={likeMovie}
													dislikeMovie={dislikeMovie}
													handleMovieSelection={handleMovieSelection}
												/>
											</Col>
										</>
									);
								})}
							</Row>
						</>
					);
				})}
			</>
		);
	} else if (isError) {
		content = (
			<div>
				<p className="h2 text-center">
					{`Oops! An error ocurred UwU ${error.toString()}`}
				</p>
			</div>
		);
	}

	let parentContainerStyle = isLoading ? "vh-100" : "h-100";

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
							Recommended movies based on your likes!
						</p>
					</Col>
				</Row>

				{content}

				{!isLoading && (
					<Row className="my-4">
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
