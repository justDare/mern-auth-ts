import React, { useState } from "react";
import RegisterModal from "./registerModal";

// Material
import Button from "@material-ui/core/Button";

function Register() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Button
        onClick={openModal}
        className="register-button"
        variant="contained"
        color="default"
      >
        Need an account?
      </Button>
      <RegisterModal open={modalOpen} handleClose={closeModal} />
    </>
  );
}

export default Register;
