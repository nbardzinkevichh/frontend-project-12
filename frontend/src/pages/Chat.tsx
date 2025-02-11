import { Container, Row, Col } from "react-bootstrap";
import Header from "../components/Header";

import Channels from "../feauters/Channels/Channels";
import Messages from "../feauters/Messages/Messages";


const Chat = () => {
  
  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100">
          <Col md={2} className="px-0 border-end">
            <Channels />
          </Col>
          <Col className="px-0">
            <Messages />
          </Col>
        </Row>
        
      </Container>
    </div>
  )
};

export default Chat;