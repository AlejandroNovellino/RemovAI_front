// react bootstrap imports
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
// import image
import logo from "./../images/Logo.png";

function MyNavbar() {
	return (
		<>
			<Navbar bg="dark" data-bs-theme="dark" className="bg-dark-subtle mb-5">
				<Container>
					<Navbar.Brand className="ms-1 pt-2">
						<img
							alt=""
							src={logo}
							width="118"
							height="33"
							className="d-inline-block align-top"
						/>
					</Navbar.Brand>
				</Container>
			</Navbar>
			<br></br>
		</>
	);
}

export default MyNavbar;
