import { Container,
   Navbar, 
   Button } from "react-bootstrap";

export default function Header() {
  return (
    <Navbar className="bg-body-tertiary vw-100 shadow-sm">
      <Container>
        <Navbar.Brand href="/">Chat</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Button href="#">Выйти</Button>
      </Container>
    </Navbar>
  )
};