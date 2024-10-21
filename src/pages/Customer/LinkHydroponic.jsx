import { Typography, Card, Row, Col } from "antd";
import { useState } from "react";
import {
  CameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import QrReader from "../../components/QR/QrScanner";
import QrImageUploader from "../../components/QR/QrImageUploader";

const { Title } = Typography;

const LinkHydroponic = () => {
  const [scannedResult, setScannedResult] = useState("");
  const [showQrScanner, setShowQrScanner] = useState(false);

  const handleScannedResult = (result) => {
    console.log("Scanned Result in LinkHydroponic:", result);
    setScannedResult(result);
    setShowQrScanner(false);
  };

  const handleCloseScanner = () => {
    setShowQrScanner(false);
  };

  const openQrScanner = () => {
    setShowQrScanner(true);
  };

  return (
    <div className="flex flex-col pt-3 px-6">
      <Title level={2}>Vincular Nuevo Hidroponico</Title>
      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Card
            hoverable
            onClick={openQrScanner}
            style={{ textAlign: "center" }}
          >
            <CameraOutlined style={{ fontSize: "48px", marginBottom: "10px" }} />
            <Title level={4}>Escanear con Cámara</Title>
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <QrImageUploader onResult={handleScannedResult} />
        </Col>
      </Row>

      {showQrScanner && (
        <div style={{ marginTop: "20px" }}>
          <QrReader
            onResult={handleScannedResult}
            onClose={handleCloseScanner}
          />
        </div>
      )}

      {scannedResult && (
        <Typography.Paragraph style={{ marginTop: "20px" }}>
          <strong>Resultado Escaneado:</strong> {scannedResult}
        </Typography.Paragraph>
      )}
    </div>
  );
};

export default LinkHydroponic;
