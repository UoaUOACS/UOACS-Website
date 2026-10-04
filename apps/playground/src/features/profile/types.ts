export interface ProfileMember {
  id: string
  upi: string
  name: string
  avatarURL?: string
}

export interface ProfileAward {
  title: string
  event: string
}

export interface ProfileProject {
  id: string
  title: string
  description: string
  imageURL?: string
  likes: number
  award?: ProfileAward
}
