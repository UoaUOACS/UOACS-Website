/**
 * An Icon component representing an exit or close action, displaying a cross symbol.
 *
 * @param props Standard SVG attributes.
 * @returns A SVG element representing an exit icon.
 */
export const ExitIcon = ({ ...props }: React.SVGAttributes<SVGElement>) => (
  <svg
    aria-hidden="true"
    className="align-middle text-white"
    fill="none"
    height="1em"
    viewBox="0 0 22 22"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M0.586088 20.3849C-0.19496 19.6038 -0.19496 18.3375 0.586088 17.5564L17.5567 0.58587C18.3377 -0.195179 19.604 -0.195179 20.3851 0.585869C21.1661 1.36692 21.1661 2.63325 20.3851 3.4143L3.41452 20.3849C2.63347 21.1659 1.36714 21.1659 0.586088 20.3849Z"
      fill="currentColor"
    />
    <path
      d="M0.585786 0.585786C1.36683 -0.195262 2.63316 -0.195262 3.41421 0.585786L20.3848 17.5563C21.1658 18.3374 21.1658 19.6037 20.3848 20.3848C19.6037 21.1658 18.3374 21.1658 17.5563 20.3848L0.585787 3.41421C-0.195262 2.63317 -0.195262 1.36683 0.585786 0.585786Z"
      fill="currentColor"
    />
  </svg>
)
