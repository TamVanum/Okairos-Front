import React from 'react';
import { Modal, Button } from 'antd';

const LinkHydroponicModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      title="Nuevo Hydroponico"
      open={isOpen} // Changed from 'visible' to 'open'
      onCancel={onClose}
      footer={null}
    >
      <Button type="primary" onClick={() => console.log('Por ID')}>
        Por ID
      </Button>
      <Button type="primary" onClick={() => console.log('Con QR')} style={{ marginLeft: '10px' }}>
        Con QR
      </Button>
    </Modal>
  );
};

export default LinkHydroponicModal;