import { useState, useRef } from "react";
import { Card, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import QrScanner from "qr-scanner";
import Title from "antd/es/typography/Title";

const QrImageUploader = ({ onResult }) => {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setLoading(true);
      QrScanner.scanImage(file, { returnDetailedScanResult: true })
        .then((result) => {
          console.log("Scanned from file:", result);
          if (onResult) {
            onResult(result.data || result);
          }
        })
        .catch((error) => {
          console.error("Error scanning image file:", error);
          message.error(
            "No se pudo escanear el código QR de la imagen seleccionada."
          );
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      console.log("No file selected");
    }
  };

  const triggerFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Card
      hoverable
      onClick={triggerFileSelect}
      style={{ textAlign: "center", cursor: "pointer" }}
    >
      <UploadOutlined style={{ fontSize: "48px", marginBottom: "10px" }} />
      <Title level={4}>Subir Imagen del Código QR</Title>
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </Card>
  );
};

export default QrImageUploader;
