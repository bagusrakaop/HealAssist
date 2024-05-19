"use client"
import React, { createContext, useContext, useState } from 'react';
import SignInModal from '@/components/landing/signInModal';
import SignUpModal from '@/components/landing/signUpModal';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isSignInOpen, setSignInOpen] = useState(false);
  const [isSignUpOpen, setSignUpOpen] = useState(false);

  const openSignInModal = () => setSignInOpen(true);
  const closeSignInModal = () => setSignInOpen(false);

  const openSignUpModal = () => setSignUpOpen(true);
  const closeSignUpModal = () => setSignUpOpen(false);

  return (
    <ModalContext.Provider value={{ openSignInModal, closeSignInModal, openSignUpModal, closeSignUpModal }}>
      {children}
      {isSignInOpen && <SignInModal onClose={closeSignInModal} />}
      {isSignUpOpen && <SignUpModal onClose={closeSignUpModal} />}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);