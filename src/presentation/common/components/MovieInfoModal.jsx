// react bootstrap imports
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function MovieInfoModal({ movie, show, handleClose }) {
	return (
		<Modal
			show={show}
			onHide={handleClose}
			backdrop="static"
			keyboard={true}
			size="xs">
			<Modal.Header closeButton>
				<Modal.Title>{movie.titulo_original}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Card bg="dark" className="text-center">
					<Card.Img
						src={`https://image.tmdb.org/t/p/w500${movie.cartel_path}`}
						alt="Card image"
					/>
					<Card.ImgOverlay>
						<Container className="tw-rounded-md tw-bg-neutral-900/[.80] px-2 py-3">
							<Row className="py-1">
								<Col xs={12}>{`Release date: ${movie.fecha_estreno}`}</Col>
							</Row>
							<Row className="py-1">
								<Col xs={12}>{`Genres: ${movie.genero_Pelicula}`}</Col>
							</Row>
							<Row className="py-1">
								<Col xs={12}>{`Synopsis:${movie.descripcion}`}</Col>
							</Row>
						</Container>
					</Card.ImgOverlay>
				</Card>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default MovieInfoModal;
