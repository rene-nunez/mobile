import { fireEvent, render } from "@testing-library/react-native";
import type { Artist } from "@/types/artist";
import ArtistList from "../app/components/ArtistList";

const { __router } = jest.requireMock("expo-router") as {
  __router: { push: jest.Mock };
};
const push = __router.push;

const ARTIST: Artist = {
  id: "mbid-1",
  name: "Radiohead",
  image: "https://example.com/radiohead.jpg",
};

describe("ArtistList", () => {
  beforeEach(() => {
    push.mockClear();
  });

  it("navigates to the detail screen with the artist data", async () => {
    const screen = await render(<ArtistList artists={[ARTIST]} />);

    await fireEvent.press(screen.getByTestId("artist-box-Radiohead"));

    expect(push).toHaveBeenCalledWith({
      pathname: "/detail",
      params: {
        id: "mbid-1",
        name: "Radiohead",
        image: "https://example.com/radiohead.jpg",
      },
    });
  });

  it("renders one box per artist", async () => {
    const screen = await render(
      <ArtistList
        artists={[ARTIST, { ...ARTIST, id: "mbid-2", name: "The Smiths" }]}
      />
    );

    expect(screen.getByTestId("artist-box-Radiohead")).toBeTruthy();
    expect(screen.getByTestId("artist-box-The Smiths")).toBeTruthy();
  });
});
