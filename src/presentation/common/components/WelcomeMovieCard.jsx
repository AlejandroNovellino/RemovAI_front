// react bootstrap imports
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function WelcomeMovieCard({ movie, likedMovies, likeMovie, dislikeMovie }) {
	let liked = false;

	if (
		likedMovies &&
		likedMovies.some(likedMovie => likedMovie.id_pelicula === movie.id_pelicula)
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
					<Button variant="dark" onClick={handleLike} size="lg">
						{liked ? (
							<i className="bi bi-hand-thumbs-up-fill tw-text-purple-200"></i>
						) : (
							<i className="bi bi-hand-thumbs-up"></i>
						)}
					</Button>
				</Card.ImgOverlay>
			</Card>
		</>
	);
}

export default WelcomeMovieCard;
