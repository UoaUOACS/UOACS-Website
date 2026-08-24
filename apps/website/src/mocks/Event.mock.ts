import type { Event } from "@/payload/payload-types"

export const mockPastEvent: Event = {
  createdAt: "2026-07-18T05:31:56.534Z",
  updatedAt: "2026-07-19T00:56:06.208Z",
  name: "404: Sleep Not Found",
  date: "2026-04-01T05:00:00.000Z",
  design: {
    createdAt: "2026-07-18T05:21:40.390Z",
    updatedAt: "2026-07-18T05:21:41.070Z",
    alt: "Study Session Event",
    prefix: "media",
    url: "http://localhost:3000/payload/api/media/file/studysesh%201.jpg?prefix=media",
    filename: "studysesh 1.jpg",
    mimeType: "image/jpeg",
    filesize: 3671256,
    width: 1335,
    height: 1668,
    focalX: 50,
    focalY: 50,
    thumbnailURL: null,
    id: "6a5b0d640acbe6f65c092812",
  },
  _status: "published",
  description: "Short Description",
  id: "6a5b0fcc0acbe6f65c0928b7",
}

export const mockUpcomingEvent: Event = {
  createdAt: "2026-07-18T05:31:56.534Z",
  updatedAt: "2026-07-19T00:56:06.208Z",
  name: "404: Sleep Not Found",
  date: "2050-09-01T05:00:00.000Z",
  design: {
    createdAt: "2026-07-18T05:21:40.390Z",
    updatedAt: "2026-07-18T05:21:41.070Z",
    alt: "Study Session Event",
    prefix: "media",
    url: "http://localhost:3000/payload/api/media/file/studysesh%201.jpg?prefix=media",
    filename: "studysesh 1.jpg",
    mimeType: "image/jpeg",
    filesize: 3671256,
    width: 1335,
    height: 1668,
    focalX: 50,
    focalY: 50,
    thumbnailURL: null,
    id: "6a5b0d640acbe6f65c092812",
  },
  _status: "published",
  description: "Short Description",
  id: "6a5b0fcc0acbe6f65c0928b7",
}

export const mockUpcomingEventWithSignUp: Event = {
  ...mockUpcomingEvent,
  signUpForm: "https://www.google.com",
}
