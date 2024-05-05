// react bootstrap imports
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function HomeMovieCard({
	movie,
	likedMovies,
	likeMovie,
	dislikeMovie,
	handleMovieSelection,
}) {
	let liked = false;

	if (
		likedMovies &&
		likedMovies.some(likedMovie => likedMovie.id_Pelicula === movie.id_Pelicula)
	) {
		liked = true;
	}

	const handleLike = () => {
		if (liked) {
			dislikeMovie(movie);
		} else {
			likeMovie(movie);
		}
	};

	return (
		<>
			<Card bg="dark" className="text-center">
				<Card.Img
					src={`https://image.tmdb.org/t/p/w500${movie.cartel_path}`}
					alt="Card image"
				/>
				<Card.ImgOverlay>
					<Container>
						<Row>
							<Col>
								<Button
									variant="dark"
									onClick={() => handleMovieSelection(movie)}>
									<i className="bi bi-info-circle tw-text-purple-200"></i>
								</Button>
							</Col>
							<Col>
								<Button variant="dark" onClick={handleLike}>
									{liked ? (
										<i className="bi bi-hand-thumbs-up-fill tw-text-purple-200"></i>
									) : (
										<i className="bi bi-hand-thumbs-up"></i>
									)}
								</Button>
							</Col>
						</Row>
					</Container>
				</Card.ImgOverlay>
			</Card>
		</>
	);
}

export default HomeMovieCard;
