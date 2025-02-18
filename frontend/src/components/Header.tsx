import { Container,
   Navbar, 
   Button } from "react-bootstrap";
import {useTranslation} from "react-i18next";

interface HeaderProps {
  status: 'loggedIn' | 'loggedOut';
  logOut?: () => void;
}

export default function Header({ status, logOut }: HeaderProps) {
  const { t } = useTranslation();

  return (
    <Navbar className="bg-body-tertiary vw-100 shadow-sm">
      <Container>
        <Navbar.Brand href="/">{t('title')}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {status === 'loggedIn' && <Button onClick={logOut} href="#">{t('logout')}</Button> }

      </Container>
    </Navbar>
  )
};