import type { Executive } from "@/payload/payload-types"

export const mockExecutive: Executive = {
  id: "68e390f21023fb09c6a454da",
  name: "Joshua Li",
  isCurrent: true,
  role: {
    title: "Senior Advisor",
    team: "admin",
  },
  updatedAt: "2025-05-01T12:00:00Z",
  createdAt: "2024-05-01T12:00:00Z",
}

export const mockExecutiveWithPhoto: Executive = {
  ...mockExecutive,
  photo: {
    id: "media123",
    url: "media/JoshLi.jpeg",
    alt: "Joshua Li Profile Photo",
    width: 500,
    height: 500,
    createdAt: "2024-05-01T12:00:00Z",
    updatedAt: "2024-05-01T12:00:00Z",
  },
}
