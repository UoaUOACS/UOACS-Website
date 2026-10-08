export interface Project {
  id: string
  title: string
  imageURL?: string
  authorName: string
  likes: number
  awardType?: string
  summary?: string
  awardEvent?: string
}

export interface ProjectCardVariantProps {
  project: Project
  className?: string
}
