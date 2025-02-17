import { Container,
   Navbar, 
   Button } from "react-bootstrap";


interface HeaderProps {
  status: 'loggedIn' | 'loggedOut';
  logOut?: () => void;
}

export default function Header({ status, logOut }: HeaderProps) {
  return (
    <Navbar className="bg-body-tertiary vw-100 shadow-sm">
      <Container>
        <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {status === 'loggedIn' && <Button onClick={logOut} href="#">Выйти</Button> }

      </Container>
    </Navbar>
  )
};