import type { Sponsor } from "@/payload/payload-types"

export const mockSandfieldSponsor: Sponsor = {
  id: "68e380871023ec09c1a45ea4",
  name: "Sandfield",
  link: "https://www.sandfield.co.nz/",
  logo: {
    createdAt: "2026-01-04T02:22:09.601Z",
    updatedAt: "2026-01-04T04:02:00.204Z",
    alt: "Sandfield",
    filename: "Logo_Sandfield_GetanEdge_White.a1701b70 1.svg",
    mimeType: "image/png",
    filesize: 8467,
    width: 176,
    height: 72,
    focalX: 50,
    focalY: 50,
    thumbnailURL: null,
    url: "media/Logo_Sandfield_GetanEdge_White.a1701b70%201.svg",
    id: "6959ced19e999cbe70109273",
  },
  tier: "silver",
  createdAt: "2025-10-06T08:40:39.127Z",
  updatedAt: "2026-01-04T02:22:20.929Z",
}

export const mockJaneStreetSponsor: Sponsor = {
  id: "6959e2859e999cbe70109300",
  name: "Jane Street",
  link: "https://www.janestreet.com/",
  logo: {
    createdAt: "2026-01-04T03:46:01.853Z",
    updatedAt: "2026-01-04T04:01:23.838Z",
    alt: "Jane Street",
    filename: "JaneStreetLogo.670cbc2f 2.svg",
    mimeType: "image/png",
    filesize: 6267,
    width: 172,
    height: 72,
    focalX: 50,
    focalY: 50,
    thumbnailURL: null,
    url: "media/JaneStreetLogo.670cbc2f%202.svg",
    id: "6959e2799e999cbe701092ec",
  },
  tier: "silver",
  createdAt: "2026-01-04T03:46:13.760Z",
  updatedAt: "2026-01-04T03:46:13.761Z",
}

export const mockSponsors: Sponsor[] = [mockSandfieldSponsor, mockJaneStreetSponsor]
