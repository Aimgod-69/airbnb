"use client";
import { useEffect } from "react";
import EmptyState from "./components/EmptyState";

interface ErrorStateProps {
  error: Error;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  //If there is any error we will log it in console
  useEffect(() => {
    console.error(error);
  }, [error]);

  //Rendering this empty state
  return <EmptyState title="Uh Oh" subtitle="Something went wrong!" />;
};

export default ErrorState;
