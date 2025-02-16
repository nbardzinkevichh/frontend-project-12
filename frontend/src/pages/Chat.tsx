import { Container, Row, Col } from "react-bootstrap";
import Header from "../components/Header";

import Channels from "../feauters/Channels/Channels";
import Messages from "../feauters/Messages/Messages";


const Chat = () => {
  
  return (
    <div className="d-flex flex-column h-100">
      <Header />
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
    </div>
  )
};

export default Chat;