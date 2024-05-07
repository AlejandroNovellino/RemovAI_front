// react imports
import { useState } from "react";
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
	// state for hovering
	const [isHovering, setIsHovering] = useState(false);
	let liked = false;

	const handleMouseEnter = () => setIsHovering(true);
	const handleMouseLeave = () => setIsHovering(false);

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
			<Card
				bg="dark"
				className="text-center"
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}>
				<Card.Img
					src={`https://image.tmdb.org/t/p/w500${movie.cartel_path}`}
					alt="Card image"
				/>
				<Card.ImgOverlay
					className={isHovering || liked ? "tw-bg-neutral-900/[.60]" : ""}>
					{(isHovering || liked) && (
						<Container fluid className="h-100 w-100">
							<Row className="h-50 p-4">
								<Col>
									<Button
										className="h-100 w-100  tw-bg-neutral-900/[.75]"
										variant="dark"
										onClick={() => handleMovieSelection(movie)}>
										<i className="h1 bi bi-info-circle tw-text-purple-200"></i>
									</Button>
								</Col>
							</Row>
							<Row className="h-50 p-4">
								<Col>
									<Button
										className="h-100 w-100 tw-bg-neutral-900/[.75]"
										variant="dark"
										onClick={handleLike}>
										{liked ? (
											<i className="h1 bi bi-hand-thumbs-up-fill tw-text-purple-200"></i>
										) : (
											<i className="h1 bi bi-hand-thumbs-up"></i>
										)}
									</Button>
								</Col>
							</Row>
						</Container>
					)}
				</Card.ImgOverlay>
			</Card>
		</>
	);
}

export default HomeMovieCard;
