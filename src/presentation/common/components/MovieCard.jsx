// react bootstrap imports
import Card from "react-bootstrap/Card";

function MovieCard({ movie }) {
	let liked = false;

	console.log(movie);

	return (
		<>
			<Card bg="dark" className="text-center">
				<Card.Img src={movie.image} alt="Card image" />
				<Card.ImgOverlay>
					<Card.Title>{movie.name}</Card.Title>
					<Card.Text>{liked}</Card.Text>
				</Card.ImgOverlay>
			</Card>
		</>
	);
}

export default MovieCard;
