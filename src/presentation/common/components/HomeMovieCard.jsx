// react bootstrap imports
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function HomeMovieCard({ movie, likedMovies, likeMovie, dislikeMovie }) {
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
					<Card.Title>{movie.titulo_original}</Card.Title>
					<Card.Text>{liked}</Card.Text>
					<Button variant={liked ? "dark" : "light"} onClick={handleLike}>
						{liked ? "Dislike" : "Like"}
					</Button>
				</Card.ImgOverlay>
			</Card>
		</>
	);
}

export default HomeMovieCard;
