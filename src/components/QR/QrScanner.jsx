import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Button, message } from "antd";

import "./QrStyles.css";

import QrScanner from "qr-scanner";
import QrFrame from "../../assets/qr-frame.svg";

const QrReader = ({ onResult, onClose }) => {
  const scanner = useRef();
  const videoEl = useRef(null);
  const qrBoxEl = useRef(null);
  const [qrOn, setQrOn] = useState(true);

  const onScanSuccess = (result) => {
    console.log(result);
    if (onResult) {
      onResult(result?.data || result);
    }
    if (scanner.current) {
      scanner.current.stop();
      scanner.current.destroy();
      scanner.current = null;
    }
  };

  const onScanFail = (err) => {
    console.log(err);
  };

  // Use useLayoutEffect to ensure the video element is available before initializing the scanner
  useLayoutEffect(() => {
    if (videoEl.current && !scanner.current) {
      scanner.current = new QrScanner(videoEl.current, onScanSuccess, {
        onDecodeError: onScanFail,
        preferredCamera: "environment",
        highlightScanRegion: true,
        highlightCodeOutline: true,
        overlay: qrBoxEl.current || undefined,
      });

      // Start QR Scanner
      scanner.current
        .start()
        .then(() => setQrOn(true))
        .catch((err) => {
          console.log(err);
          setQrOn(false);
        });
    }

    return () => {
      if (scanner.current) {
        scanner.current.stop();
        scanner.current.destroy();
        scanner.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!qrOn)
      message.error(
        "La cámara está bloqueada o no es accesible. Por favor, permite el acceso a la cámara en los permisos de tu navegador y recarga la página."
      );
  }, [qrOn]);

  return (
    <div className="qr-reader">
      {qrOn && (
        <video
          ref={videoEl}
          style={{ width: "100%", height: "auto" }}
        ></video>
      )}
      <div ref={qrBoxEl} className="qr-box">
        <img
          src={QrFrame}
          alt="Qr Frame"
          width={256}
          height={256}
          className="qr-frame"
        />
      </div>

      <Button
        onClick={onClose}
        type="default"
        style={{ marginTop: "10px" }}
        block
      >
        Cerrar
      </Button>
    </div>
  );
};

export default QrReader;
