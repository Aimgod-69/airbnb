"use client";

import axios from "axios";
//Icons
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
//React Hooks
import { useState, useCallback } from "react";

//Form
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Modal from "./Modal";

//Custom Hook
import useRegisterModal from "@/app/hooks/useRegisterModal";

//Custom Components
import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "../Button";

//Next Auth
import { signIn } from "next-auth/react";

//Toast
import { toast } from "react-hot-toast";
import useLoginModal from "@/app/hooks/useLoginModal";
const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  //Submit Handler
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Success!");
        registerModal.onClose();
        loginModal.onOpen();
      })
      .catch((error) => {
        toast.error("Something Went Wrong!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  //Toggle Login Signup
  const toggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create an account!" />
      <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required />
      <Input id="name" label="Name" disabled={isLoading} register={register} errors={errors} required />
      <Input id="password" label="Password" type="password" disabled={isLoading} register={register} errors={errors} required />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        icon={FcGoogle}
        label="Continue With Google"
        onClick={() => {
          signIn("google");
        }}
      />
      <Button
        outline
        icon={AiFillGithub}
        label="Continue With Github"
        onClick={() => {
          signIn("github");
        }}
      />
      <div className="text-neutral-500 font-light mt-4">
        <div className="flex justify-center gap-2">
          <div>Already have an account?</div>
          <div onClick={toggle} className="text-neutral-800 cursor-pointer hover:underline">
            Login
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
