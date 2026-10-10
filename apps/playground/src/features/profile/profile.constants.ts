export const PROFILE_TABS = ["Projects", "About"] as const

export type ProfileTab = (typeof PROFILE_TABS)[number]

/**
 * Placeholder options for the edit profile form, as `Member` has no languages field yet.
 */
export const LANGUAGES = [
  "Arabic",
  "Chinese",
  "English",
  "Fijian",
  "French",
  "German",
  "Gujarati",
  "Hindi",
  "Indonesian",
  "Italian",
  "Japanese",
  "Korean",
  "Malay",
  "New Zealand Sign Language",
  "Portuguese",
  "Punjabi",
  "Russian",
  "Samoan",
  "Spanish",
  "Tagalog",
  "Tamil",
  "Te Reo Māori",
  "Thai",
  "Tongan",
  "Vietnamese",
] as const
