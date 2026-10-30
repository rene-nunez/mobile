import * as React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { Alert } from "react-native";
import Index from "../index";

jest.spyOn(Alert, "alert");

describe("Index (Login Screen)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", async () => {
    const { getByText, getByPlaceholderText } = await render(<Index />);

    expect(getByPlaceholderText("Enter email")).toBeTruthy();
    expect(getByPlaceholderText("Enter password")).toBeTruthy();
    expect(getByText("Log in")).toBeTruthy();
    expect(getByText("New here? ")).toBeTruthy();
    expect(getByText("Sign up")).toBeTruthy();
  });

  it("shows alert when fields are empty", async () => {
    const { getByText } = await render(<Index />);

    await fireEvent.press(getByText("Log in"));

    expect(Alert.alert).toHaveBeenCalledWith(
      "Missing information",
      "Please fill in both fields."
    );
  });

  it("show alert when only email is empty", async () => {
    const { getByText, getByPlaceholderText } = await render(<Index />);

    await fireEvent.changeText(
      getByPlaceholderText("Enter password"),
      "Password!"
    );

    await fireEvent.press(getByText("Log in"));

    expect(Alert.alert).toHaveBeenCalledWith(
      "Missing information",
      "Please fill in both fields."
    );
  });

  it("show alert when only password is empty", async () => {
    const { getByText, getByPlaceholderText } = await render(<Index />);

    await fireEvent.changeText(
      getByPlaceholderText("Enter email"),
      "test@jestjs.io"
    );

    await fireEvent.press(getByText("Log in"));

    expect(Alert.alert).toHaveBeenCalledWith(
      "Missing information",
      "Please fill in both fields."
    );
  });

  it("has secure text entry for password field", async () => {
    const { getByPlaceholderText } = await render(<Index />);

    expect(getByPlaceholderText("Enter password").props.secureTextEntry).toBeTruthy();
  });

  it("has correct keyboard type for email field", async () => {
    const { getByPlaceholderText } = await render(<Index />);

    expect(getByPlaceholderText("Enter email").props.keyboardType).toBe("email-address");
  });
});
