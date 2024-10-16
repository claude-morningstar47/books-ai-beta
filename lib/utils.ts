import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const STAGGER_CHILD_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export const getStringFromBuffer = (buffer: ArrayBuffer) =>
  Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

export enum ResultCode {
  InvalidCredentials = "INVALID_CREDENTIALS",
  InvalidSubmission = "INVALID_SUBMISSION",
  UserAlreadyExists = "USER_ALREADY_EXISTS",
  UnknownError = "UNKNOWN_ERROR",
  UserCreated = "USER_CREATED",
  UserLoggedIn = "USER_LOGGED_IN",
}

export const getMessageFromCode = (resultCode: string) => {
  switch (resultCode) {
    case ResultCode.InvalidCredentials:
      return "Invalid credentials! Please check your email or password.";
    case ResultCode.InvalidSubmission:
      return "Invalid submission, please try again! Ensure all fields are filled out.";
    case ResultCode.UserAlreadyExists:
      return "User already exists. Please log in with your credentials.";
    case ResultCode.UserCreated:
      return "User successfully created! Welcome aboard.";
    case ResultCode.UnknownError:
      return "An unknown error occurred. Please try again later.";
    case ResultCode.UserLoggedIn:
      return "Successfully logged in! Welcome back.";
    default:
      return "An unexpected result occurred.";
  }
};
