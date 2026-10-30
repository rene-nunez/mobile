import * as React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { Alert } from "react-native";
import Register from "../register";

jest.spyOn(Alert, "alert");

type Screen = Awaited<ReturnType<typeof render>>;

type FormValues = {
  email?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
};

const VALID_FORM: Required<FormValues> = {
  email: "test@jestjs.io",
  username: "test_user",
  password: "Password!",
  confirmPassword: "Password!",
};

async function fillForm(screen: Screen, values: FormValues = VALID_FORM) {
  const { email, username, password, confirmPassword } = {
    ...VALID_FORM,
    ...values,
  };

  await fireEvent.changeText(
    screen.getByPlaceholderText("Enter email"),
    email
  );
  await fireEvent.changeText(
    screen.getByPlaceholderText("Enter username"),
    username
  );
  await fireEvent.changeText(
    screen.getByPlaceholderText("Enter password"),
    password
  );
  await fireEvent.changeText(
    screen.getByPlaceholderText("Confirm password"),
    confirmPassword
  );
}

async function pressSignUp(screen: Screen) {
  await fireEvent.press(screen.getByText("Sign up"));
}

describe("Register (Sign Up Screen)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", async () => {
    const screen = await render(<Register />);

    expect(screen.getByPlaceholderText("Enter email")).toBeTruthy();
    expect(screen.getByPlaceholderText("Enter username")).toBeTruthy();
    expect(screen.getByPlaceholderText("Enter password")).toBeTruthy();
    expect(screen.getByPlaceholderText("Confirm password")).toBeTruthy();
    expect(screen.getByText("Sign up")).toBeTruthy();
  });

  it("has secure text entry for password fields", async () => {
    const screen = await render(<Register />);

    expect(
      screen.getByPlaceholderText("Enter password").props.secureTextEntry
    ).toBeTruthy();
    expect(
      screen.getByPlaceholderText("Confirm password").props.secureTextEntry
    ).toBeTruthy();
  });

  it("has correct keyboard type for email field", async () => {
    const screen = await render(<Register />);

    expect(
      screen.getByPlaceholderText("Enter email").props.keyboardType
    ).toBe("email-address");
  });

  describe("Missing information", () => {
    it("shows alert when all fields are empty", async () => {
      const screen = await render(<Register />);

      await pressSignUp(screen);

      expect(Alert.alert).toHaveBeenCalledWith(
        "Missing information",
        "Please fill in all the fields."
      );
    });

    it("shows alert when only email is empty", async () => {
      const screen = await render(<Register />);

      await fillForm(screen, { email: "" });
      await pressSignUp(screen);

      expect(Alert.alert).toHaveBeenCalledWith(
        "Missing information",
        "Please fill in all the fields."
      );
    });

    it("shows alert when only username is empty", async () => {
      const screen = await render(<Register />);

      await fillForm(screen, { username: "" });
      await pressSignUp(screen);

      expect(Alert.alert).toHaveBeenCalledWith(
        "Missing information",
        "Please fill in all the fields."
      );
    });

    it("shows alert when only password is empty", async () => {
      const screen = await render(<Register />);

      await fillForm(screen, { password: "" });
      await pressSignUp(screen);

      expect(Alert.alert).toHaveBeenCalledWith(
        "Missing information",
        "Please fill in all the fields."
      );
    });

    it("shows alert when confirm password is empty", async () => {
      const screen = await render(<Register />);

      await fillForm(screen, { confirmPassword: "" });
      await pressSignUp(screen);

      expect(Alert.alert).toHaveBeenCalledWith(
        "Missing information",
        "Please fill in all the fields."
      );
    });
  });

  describe("Email validation", () => {
    it("accepts valid email formats", async () => {
      const screen = await render(<Register />);

      await fillForm(screen);
      await pressSignUp(screen);

      expect(Alert.alert).toHaveBeenCalledWith(
        "Success",
        "Account created.",
        [
          {
            text: "OK",
            onPress: expect.any(Function),
          },
        ]
      );
    });

    it("rejects invalid email formats", async () => {
      const screen = await render(<Register />);

      await fillForm(screen, { email: "test@jestjs" });
      await pressSignUp(screen);

      expect(Alert.alert).toHaveBeenCalledWith(
        "Invalid email",
        "Please enter a valid email address."
      );
    });
  });

  describe("Username validation", () => {
    it("accepts usernames with letters, numbers, and underscores", async () => {
      const screen = await render(<Register />);

      await fillForm(screen, { username: "user_123" });
      await pressSignUp(screen);

      expect(Alert.alert).toHaveBeenCalledWith(
        "Success",
        "Account created.",
        [
          {
            text: "OK",
            onPress: expect.any(Function),
          },
        ]
      );
    });

    it("rejects usernames with invalid characters", async () => {
      const screen = await render(<Register />);

      await fillForm(screen, { username: "test-user" });
      await pressSignUp(screen);

      expect(Alert.alert).toHaveBeenCalledWith(
        "Invalid username format",
        "Use only letters, numbers, and underscores."
      );
    });

    it("rejects usernames shorter than 3 characters", async () => {
      const screen = await render(<Register />);

      await fillForm(screen, { username: "ab" });
      await pressSignUp(screen);

      expect(Alert.alert).toHaveBeenCalledWith(
        "Invalid username length",
        "Your username must be between 3 and 20 characters long."
      );
    });

    it("rejects usernames longer than 20 characters", async () => {
      const screen = await render(<Register />);

      await fillForm(screen, { username: "abcdefghijklmnopqrstu" });
      await pressSignUp(screen);

      expect(Alert.alert).toHaveBeenCalledWith(
        "Invalid username length",
        "Your username must be between 3 and 20 characters long."
      );
    });
  });

  describe("Password validation", () => {
    it("accepts valid passwords", async () => {
      const screen = await render(<Register />);

      await fillForm(screen);
      await pressSignUp(screen);

      expect(Alert.alert).toHaveBeenCalledWith(
        "Success",
        "Account created.",
        [
          {
            text: "OK",
            onPress: expect.any(Function),
          },
        ]
      );
    });

    it("rejects passwords without uppercase", async () => {
      const screen = await render(<Register />);

      await fillForm(screen, {
        password: "password!",
        confirmPassword: "password!",
      });
      await pressSignUp(screen);

      expect(Alert.alert).toHaveBeenCalledWith(
        "Password requirement",
        "Add at least one uppercase letter."
      );
    });

    it("rejects passwords without lowercase", async () => {
      const screen = await render(<Register />);

      await fillForm(screen, {
        password: "PASSWORD!",
        confirmPassword: "PASSWORD!",
      });
      await pressSignUp(screen);

      expect(Alert.alert).toHaveBeenCalledWith(
        "Password requirement",
        "Add at least one lowercase letter."
      );
    });

    it("rejects passwords without special characters", async () => {
      const screen = await render(<Register />);

      await fillForm(screen, {
        password: "Password",
        confirmPassword: "Password",
      });
      await pressSignUp(screen);

      expect(Alert.alert).toHaveBeenCalledWith(
        "Password requirement",
        "Add at least one special character."
      );
    });

    it("rejects passwords shorter than 8 characters", async () => {
      const screen = await render(<Register />);

      await fillForm(screen, {
        password: "Passwor",
        confirmPassword: "Passwor",
      });
      await pressSignUp(screen);

      expect(Alert.alert).toHaveBeenCalledWith(
        "Password too short",
        "Use at least 8 characters."
      );
    });

    it("rejects passwords with only numbers and special characters", async () => {
      const screen = await render(<Register />);

      await fillForm(screen, {
        password: "8429#($!",
        confirmPassword: "8429#($!",
      });
      await pressSignUp(screen);

      expect(Alert.alert).toHaveBeenCalledWith(
        "Password requirement",
        "Add at least one uppercase letter."
      );
    });
  });

  describe("Password confirmation", () => {
    it("rejects passwords that do not match", async () => {
      const screen = await render(<Register />);

      await fillForm(screen, { confirmPassword: "Password?" });
      await pressSignUp(screen);

      expect(Alert.alert).toHaveBeenCalledWith(
        "Password don't match",
        "Please enter the same password in both fields."
      );
    });
  });

  describe("Successful sign up", () => {
    it("shows success alert when all fields are valid", async () => {
      const screen = await render(<Register />);

      await fillForm(screen);
      await pressSignUp(screen);

      expect(Alert.alert).toHaveBeenCalledWith(
        "Success",
        "Account created.",
        [
          {
            text: "OK",
            onPress: expect.any(Function),
          },
        ]
      );
    });
  });
});
