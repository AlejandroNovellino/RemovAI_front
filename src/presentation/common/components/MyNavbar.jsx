// react bootstrap imports
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
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
					<Navbar.Collapse className="justify-content-end">
						<Navbar.Text>Signed in as: {}</Navbar.Text>

						<Button variant="light" onClick={() => {}}>
							<i className="bi bi-box-arrow-left"></i>
							{" Logout"}
						</Button>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
}

export default MyNavbar;
