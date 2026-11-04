import { render } from "@testing-library/react-native";
import Detail from "../app/detail";

const { useLocalSearchParams } = jest.requireMock("expo-router") as {
  useLocalSearchParams: jest.Mock;
};

describe("Detail", () => {
  beforeEach(() => {
    useLocalSearchParams.mockReturnValue({});
  });

  it("shows the artist name", async () => {
    useLocalSearchParams.mockReturnValue({ name: "Radiohead" });

    const screen = await render(<Detail />);

    expect(screen.getByText("Radiohead")).toBeTruthy();
  });

  it("shows a default text when no name is provided", async () => {
    const screen = await render(<Detail />);

    expect(screen.getByText("Unknown artist")).toBeTruthy();
  });

  it("renders the image when the url is provided", async () => {
    useLocalSearchParams.mockReturnValue({
      name: "Radiohead",
      image: "https://example.com/radiohead.jpg",
    });

    const screen = await render(<Detail />);

    expect(screen.getByTestId("detail-image")).toBeTruthy();
  });

  it("does not render an image when no url is provided", async () => {
    const screen = await render(<Detail />);

    expect(screen.queryByTestId("detail-image")).toBeNull();
  });
});
