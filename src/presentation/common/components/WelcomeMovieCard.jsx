// react bootstrap imports
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function WelcomeMovieCard({ movie, likedMovies, likeMovie, dislikeMovie }) {
	let liked = false;

	if (
		likedMovies &&
		likedMovies.some(likedMovie => likedMovie.id === movie.id)
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
				<Card.Img src={movie.image} alt="Card image" />
				<Card.ImgOverlay>
					<Card.Title>{movie.name}</Card.Title>
					<Card.Text>{liked}</Card.Text>
					<Button variant={liked ? "dark" : "light"} onClick={handleLike}>
						{liked ? "Dislike" : "Like"}
					</Button>
				</Card.ImgOverlay>
			</Card>
		</>
	);
}

export default WelcomeMovieCard;
