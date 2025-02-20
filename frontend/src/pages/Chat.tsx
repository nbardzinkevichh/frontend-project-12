import { Container, Row, Col } from "react-bootstrap";
import Header from "../components/Header";

import Channels from "../feauters/Channels/Channels";
import Messages from "../feauters/Messages/Messages";
import { useNavigate } from "react-router-dom";


const Chat = () => {

  const navigate = useNavigate();

  const logOut = (): void => {
    localStorage.clear();
    navigate('/login');
  }
  
  return (
    // cпросить здесь про div, если внешнему диву добавить классов/стилей он просто не отображается, пришлось ставить руту классы
    <>
      <Header status='loggedIn' logOut={logOut} />
      <Container className="my-4 rounded overflow-hidden shadow h-100">
        <Row className="bg-white flex-md-row h-100 ">
          <Col md={2} className="px-0 border-end h-100  overflow-auto">
            <Channels />
          </Col>
          <Col className="p-0 h-100">
            <Messages />
          </Col>
        </Row>
        
      </Container>
    </>
  )
};

export default Chat;