type ApiImage = { "#text": string; size: string };
type ApiArtist = { mbid: string; name: string; image: ApiImage[] };

const ORIGINAL_API_KEY = process.env.EXPO_PUBLIC_LASTFM_API_KEY;

function image(size: string, url: string): ApiImage {
  return { "#text": url, size };
}

function artistWithImages(images: ApiImage[]): ApiArtist {
  return { mbid: "mbid-1", name: "Radiohead", image: images };
}

function mockFetchResponse(artists: ApiArtist[]) {
  globalThis.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ topartists: { artist: artists } }),
  }) as unknown as typeof fetch;
}

function loadApiClient(): typeof import("@/lib/api-client") {
  let api!: typeof import("@/lib/api-client");

  jest.isolateModules(() => {
    api = jest.requireActual<typeof import("@/lib/api-client")>("@/lib/api-client");
  });

  return api;
}

describe("getMusicData", () => {
  beforeEach(() => {
    process.env.EXPO_PUBLIC_LASTFM_API_KEY = "test-key";
  });

  afterAll(() => {
    if (ORIGINAL_API_KEY === undefined) {
      delete process.env.EXPO_PUBLIC_LASTFM_API_KEY;
    } else {
      process.env.EXPO_PUBLIC_LASTFM_API_KEY = ORIGINAL_API_KEY;
    }
  });

  it("picks the largest image of all", async () => {
    mockFetchResponse([
      artistWithImages([
        image("small", "small.jpg"),
        image("large", "large.jpg"),
        image("mega", "mega.jpg"),
      ]),
    ]);

    const artists = await loadApiClient().getMusicData();

    expect(artists).toEqual([
      { id: "mbid-1", name: "Radiohead", image: "mega.jpg" },
    ]);
  });

  it("uses the next largest if mega is empty", async () => {
    mockFetchResponse([
      artistWithImages([
        image("large", "large.jpg"),
        image("extralarge", "extralarge.jpg"),
        image("mega", ""),
      ]),
    ]);

    const [artist] = await loadApiClient().getMusicData();

    expect(artist.image).toBe("extralarge.jpg");
  });

  it("returns an empty string if no image has a url", async () => {
    mockFetchResponse([
      artistWithImages([image("small", ""), image("mega", "")]),
    ]);

    const [artist] = await loadApiClient().getMusicData();

    expect(artist.image).toBe("");
  });

  it("throw error if api key is left", () => {
    delete process.env.EXPO_PUBLIC_LASTFM_API_KEY;

    expect(() => loadApiClient().getMusicData()).toThrow(
      "EXPO_PUBLIC_LASTFM_API_KEY"
    );
  });
});
