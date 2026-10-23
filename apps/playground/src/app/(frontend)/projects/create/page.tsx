import { AnimatedSuspense, SessionUnavailable } from "@uoacs/ui"
import { redirectToLogin } from "@/features/auth/auth.helpers"
import { getCurrentMember } from "@/features/member/member.queries"
import { ProjectEditor } from "@/features/project/components/ProjectEditor/ProjectEditor"
import { ProjectEditorSkeleton } from "@/features/project/components/ProjectEditor/ProjectEditorSkeleton"
import { projectFormOptions } from "@/features/project/editor/projectForm.options"
import { toProjectAuthor } from "@/features/project/helpers/toProjectAuthor"
import { Routes } from "@/lib/routes"

const CreateProjectContent = async () => {
  const current = await getCurrentMember()
  if (current.status === "unauthenticated") redirectToLogin(Routes.PROJECTS.CREATE)
  if (current.status !== "authenticated") return <SessionUnavailable />

  return (
    <ProjectEditor
      author={toProjectAuthor(current.member)}
      initialValues={projectFormOptions.defaultValues}
    />
  )
}

export default function CreateProjectPage() {
  return (
    <AnimatedSuspense fallback={<ProjectEditorSkeleton create />}>
      <CreateProjectContent />
    </AnimatedSuspense>
  )
}
