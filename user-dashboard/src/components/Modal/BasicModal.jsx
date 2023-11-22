import React from "react";
import { Modal } from "@mui/material";

const BasicModal = ({ children, openModal, setOpenModal }) => {
  return (
    <Modal
      open={openModal}
      onClose={setOpenModal(false)}
      aria-labelledby="modal-basic"
      aria-describedby="modal-basic-layout"
    >
      {children}
    </Modal>
  );
};

export default BasicModal;
