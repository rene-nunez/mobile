import { render, waitFor } from "@testing-library/react-native";
import { getMusicData } from "@/lib/api-client";
import type { Artist } from "@/types/artist";
import Home from "../app/home";

jest.mock("@/lib/api-client", () => ({ getMusicData: jest.fn() }));

const mockedGetMusicData = jest.mocked(getMusicData);

const ARTISTS: Artist[] = [
  { id: "1", name: "Radiohead", image: "https://example.com/radiohead.jpg" },
  { id: "2", name: "The Smiths", image: "https://example.com/thesmiths.jpg" },
];

describe("Home", () => {
  beforeEach(() => {
    mockedGetMusicData.mockReset();
  });

  it("renders the artists returned by the API", async () => {
    mockedGetMusicData.mockResolvedValue(ARTISTS);

    const screen = await render(<Home />);

    expect(await screen.findByText("Radiohead")).toBeTruthy();
    expect(screen.getByText("The Smiths")).toBeTruthy();
  });

  it("does not break if the API returns an empty list", async () => {
    mockedGetMusicData.mockResolvedValue([]);

    await render(<Home />);

    await waitFor(() => expect(mockedGetMusicData).toHaveBeenCalledTimes(1));
  });
});
