import type { InnerSocialIconProps } from "./SocialIcon.types"

/**
 * An Icon component representing LinkedIn.
 *
 * @param props Standard SVG attributes.
 * @returns A SVG element representing the LinkedIn icon.
 */
export const LinkedinIcon = ({ ...props }: InnerSocialIconProps) => (
  <svg
    aria-hidden="true"
    className="align-middle"
    fill="none"
    height="88"
    viewBox="0 0 88 88"
    width="88"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M78.2222 88H9.77778C4.37766 88 0 83.6223 0 78.2222V9.77778C0 4.37766 4.37766 0 9.77778 0H78.2222C83.6223 0 88 4.37766 88 9.77778V78.2222C88 83.6223 83.6223 88 78.2222 88ZM62.7191 75.7778H75.7778V48.9515C75.7778 37.601 69.3436 32.1129 60.3565 32.1129C51.3652 32.1129 47.5812 39.1147 47.5812 39.1147V33.4074H34.9963V75.7778H47.5812V53.5359C47.5812 47.5764 50.3245 44.03 55.5753 44.03C60.402 44.03 62.7191 47.4378 62.7191 53.5359V75.7778ZM13.4842 75.7778H26.607V33.4074H13.4842V75.7778ZM12.2222 20.0408C12.2222 24.3585 15.6958 27.8594 19.9825 27.8594C24.2692 27.8594 27.7408 24.3585 27.7408 20.0408C27.7408 15.7231 24.2692 12.2222 19.9825 12.2222C15.6958 12.2222 12.2222 15.7231 12.2222 20.0408Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
)
