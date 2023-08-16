"use client";
import { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import AuthInputs from "./AuthInputs";
import LoginInput from "./LoginInput";
import useAuth from "@/hooks/userAuth";
import { AuthenticationContext } from "@/app/context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AuthModal({ isSignIn }: { isSignIn: boolean }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [formValues, setFormValues] = useState(null);

  const { signIn, signUp } = useAuth();

  const { loading, data, error, setAuthState }: any = useContext(
    AuthenticationContext
  );

  const handleInputChange = (values: any) => {
    signUp(values, handleClose);
    setFormValues(values);
  };

  const handleLogin = (values: any) => {
    signIn(values, handleClose);
  };

  return (
    <div className="">
      <button
        className={`${
          isSignIn ? "bg-blue-400 text-white" : ""
        } border p-1 px-4 rounded mr-3`}
        onClick={handleOpen}
      >
        {isSignIn ? "Sign Up" : "Sign In"}
      </button>
      <Modal
        sx={{ paddingY: 20 }}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p>
            {data?.firstName} {data?.lastName}
          </p>
          {error ? <Alert severity="error">{error}</Alert> : null}
          {loading ? (
            <div className="py-24 px-2 flex justify-center">
              <CircularProgress />
            </div>
          ) : isSignIn ? (
            <AuthInputs
              handleInputChange={handleInputChange}
              isSignIn={isSignIn}
            />
          ) : (
            <LoginInput handleLogin={handleLogin} />
          )}
        </Box>
      </Modal>
    </div>
  );
}
