import { Typography, Card, Row, Col, Modal, Spin } from "antd";
import { useState } from "react";
import { CameraOutlined, LoadingOutlined } from "@ant-design/icons";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import QrReader from "../../components/QR/QrScanner";
import QrImageUploader from "../../components/QR/QrImageUploader";
import axiosInstance from "../../api/AxiosInstance";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const LinkHydroponic = () => {
  const [scannedResult, setScannedResult] = useState("");
  const [showQrScanner, setShowQrScanner] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleScannedResult = async (result) => {
    console.log("Scanned Result in LinkHydroponic:", result);
    setScannedResult(result);
    setShowQrScanner(false);
    setIsLoading(true);

    try {
      const response = await axiosInstance.post(`users/me/hydroponic/`, {
        hydroponicId: result,
      });

      if (response.status === 200) {
        handleSuccess("Hidropónico vinculado exitosamente");
        return;
      }

      handleError("Ocurrió un error al vincular el hidropónico");
    } catch (error) {
      handleServerError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccess = (message) => {
    setModalContent(message);
    setIsSuccess(true);
    setModalVisible(true);

    setTimeout(() => {
      setModalVisible(false);
      navigate("/customer/plants");
    }, 2000);
  };

  const handleError = (message) => {
    setModalContent(message);
    setIsSuccess(false);
    setModalVisible(true);
  };

  const handleServerError = (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 403:
          handleError(
            "Máxima capacidad de hidropónicos alcanzados, recuerda que siempre puedes mejorar tu plan"
          );
          break;
        case 409:
          handleError("Ya tienes este hidropónico vinculado a tu cuenta");
          break;
        default:
          handleError("Ocurrió un error al vincular el hidropónico");
      }
    } else {
      handleError("Ocurrió un error inesperado. Por favor, inténtalo de nuevo.");
    }
  };

  const handleCloseScanner = () => {
    setShowQrScanner(false);
  };

  const openQrScanner = () => {
    setShowQrScanner(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="flex flex-col pt-3 px-6">
      <Title level={2}>Vincular Nuevo Hidropónico</Title>
      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Card
            hoverable
            onClick={openQrScanner}
            className="text-center"
          >
            <CameraOutlined className="text-6xl mb-2" />
            <Title level={4}>Escanear con Cámara</Title>
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <QrImageUploader onResult={handleScannedResult} />
        </Col>
      </Row>

      {showQrScanner && (
        <div className="mt-5">
          <QrReader
            onResult={handleScannedResult}
            onClose={handleCloseScanner}
          />
        </div>
      )}

      {scannedResult && (
        <Typography.Paragraph className="mt-5">
          <strong>Resultado Escaneado:</strong> {scannedResult}
        </Typography.Paragraph>
      )}

      <Modal
        title={null}
        visible={modalVisible}
        onCancel={handleCloseModal}
        footer={null}
        centered
      >
        <div className="text-center">
          {isSuccess ? (
            <CheckCircleOutlined className="text-green-500 text-6xl" />
          ) : (
            <CloseCircleOutlined className="text-red-500 text-6xl" />
          )}
          <p className="text-lg mt-5">{modalContent}</p>
        </div>
      </Modal>

      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            zIndex: 1000,
          }}
        >
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        </div>
      )}
    </div>
  );
};

export default LinkHydroponic;
