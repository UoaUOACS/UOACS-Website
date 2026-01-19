/**
 * A Icon component representing a menu (hamburger) icon.
 *
 * @param props Standard SVG attributes.
 * @returns A SVG element representing a menu icon.
 */
export const MenuIcon = ({ ...props }: React.SVGAttributes<SVGElement>) => (
  <svg
    aria-hidden="true"
    className="align-middle text-white"
    height="1em"
    viewBox="0 0 28 22"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect fill="currentColor" height="4" rx="2" width="28" />
    <rect fill="currentColor" height="4" rx="2" width="28" y="9" />
    <rect fill="currentColor" height="4" rx="2" width="28" y="18" />
  </svg>
)
