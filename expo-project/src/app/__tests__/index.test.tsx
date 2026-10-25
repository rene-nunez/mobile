import * as React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { TextInput, Alert } from "react-native";
import Index from "../index";

jest.spyOn(Alert, "alert");

describe("Index (Login Screen)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", async () => {
    const { getAllByText, getByPlaceholderText } = await render(<Index />);

    expect(getByPlaceholderText("Enter email")).toBeTruthy();
    expect(getByPlaceholderText("Enter password")).toBeTruthy();
    expect(getAllByText("Log in")).toHaveLength(1);
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

  describe("Email validation", () => {
    it("accepts valid email formats", async () => {
      const { getByText, getByPlaceholderText } = await render(<Index />);

      await fireEvent.changeText(
        getByPlaceholderText("Enter email"),
        "test@jestjs.io"
      );

      await fireEvent.changeText(
        getByPlaceholderText("Enter password"),
        "Password!"
      );

      await fireEvent.press(getByText("Log in"));

      expect(Alert.alert).toHaveBeenCalledWith(
        "Success",
        "Your inputs passed the checks.",
        [
          {
            text: "OK",
            onPress: expect.any(Function),
          },
        ],
      );
    });

    it("rejects invalid emails formats", async () => {
      const { getByText, getByPlaceholderText } = await render(<Index />);

      await fireEvent.changeText(
        getByPlaceholderText("Enter email"),
        "test@jestjs"
      );

      await fireEvent.changeText(
        getByPlaceholderText("Enter password"),
        "Password!"
      );

      await fireEvent.press(getByText("Log in"));

      expect(Alert.alert).toHaveBeenCalledWith(
        "Invalid email",
        "Please enter a valid email address."
      );
    });
  });

  describe("Password validation", () => {
    it("accepts valid passwords", async () => {
      const { getByText, getByPlaceholderText } = await render(<Index />);

      await fireEvent.changeText(
        getByPlaceholderText("Enter email"),
        "test@jestjs.io"
      );

      await fireEvent.changeText(
        getByPlaceholderText("Enter password"),
        "Password!"
      );

      await fireEvent.press(getByText("Log in"));

      expect(Alert.alert).toHaveBeenCalledWith(
        "Success",
        "Your inputs passed the checks.",
        [
          {
            text: "OK",
            onPress: expect.any(Function),
          },
        ],
      );
    });

    it("rejecs passwords without uppercase", async () => {
      const { getByText, getByPlaceholderText } = await render(<Index />);

      await fireEvent.changeText(
        getByPlaceholderText("Enter email"),
        "test@jestjs.io"
      );

      await fireEvent.changeText(
        getByPlaceholderText("Enter password"),
        "password!"
      );

      await fireEvent.press(getByText("Log in"));

      expect(Alert.alert).toHaveBeenCalledWith(
        "Password requirement",
        "Add at least one uppercase letter."
      );
    });

    it("rejecs passwords without lowercase", async () => {
      const { getByText, getByPlaceholderText } = await render(<Index />);

      await fireEvent.changeText(
        getByPlaceholderText("Enter email"),
        "test@jestjs.io"
      );

      await fireEvent.changeText(
        getByPlaceholderText("Enter password"),
        "PASSWORD!"
      );

      await fireEvent.press(getByText("Log in"));

      expect(Alert.alert).toHaveBeenCalledWith(
        "Password requirement",
        "Add at least one lowercase letter."
      );
    });

    it("rejecs passwords without special characters", async () => {
      const { getByText, getByPlaceholderText } = await render(<Index />);

      await fireEvent.changeText(
        getByPlaceholderText("Enter email"),
        "test@jestjs.io"
      );

      await fireEvent.changeText(
        getByPlaceholderText("Enter password"),
        "Password"
      );

      await fireEvent.press(getByText("Log in"));

      expect(Alert.alert).toHaveBeenCalledWith(
        "Password requirement",
        "Add at least one special character."
      );
    });

    it("rejects passwords shorter than 8 characters", async () => {
      const { getByText, getByPlaceholderText } = await render(<Index />);

      await fireEvent.changeText(
        getByPlaceholderText("Enter email"),
        "test@jestjs.io"
      );

      await fireEvent.changeText(
        getByPlaceholderText("Enter password"),
        "Passwor"
      );

      await fireEvent.press(getByText("Log in"));

      expect(Alert.alert).toHaveBeenCalledWith(
        "Password too short",
        "Use at least 8 characters."
      );
    });

    it("rejects passwords with only numbers and special characters", async () => {
      const { getByText, getByPlaceholderText } = await render(<Index />);

      await fireEvent.changeText(
        getByPlaceholderText("Enter email"),
        "test@jestjs.io"
      );

      await fireEvent.changeText(
        getByPlaceholderText("Enter password"),
        "8429#($!"
      );

      await fireEvent.press(getByText("Log in"));

      expect(Alert.alert).toHaveBeenCalledWith(
        "Password requirement",
        "Add at least one uppercase letter."
      );
    });
  });
});
