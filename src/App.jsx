import { Row, Col } from "antd";
import Header from "./components/Header.jsx";
import Table from "./components/Table.jsx";

function App() {
  return (
    <div>
      <Header />
      <Row>
        <Col xs={24} md={{ span: 12, offset: 6 }}>
          <Table />
        </Col>
      </Row>
    </div>
  );
}

export default App;
