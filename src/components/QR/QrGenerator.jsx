import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Input, Button } from 'antd';

const QrGenerator = () => {
  const [url, setUrl] = useState('');
  const [qrValue, setQrValue] = useState('');

  const handleGenerate = () => {
    setQrValue(url);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Generador de Código QR</h2>
      <Input
        placeholder="Ingresa la URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ maxWidth: '400px', margin: '0 auto' }}
      />
      <Button
        type="primary"
        onClick={handleGenerate}
        style={{ marginTop: '10px' }}
        disabled={!url}
      >
        Generar Código QR
      </Button>
      {qrValue && (
        <div style={{ marginTop: '20px' }}>
          <QRCodeCanvas
            value={qrValue}
            size={256}
            level="H"
            includeMargin={true}
          />
        </div>
      )}
    </div>
  );
};

export default QrGenerator;
