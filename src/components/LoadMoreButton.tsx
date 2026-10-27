import { siteConfig } from "@/config/SiteConfig"

interface LoadMoreButtonProps {
  onClick: () => void
}

const LoadMoreButton = ({ onClick }: LoadMoreButtonProps) => {
  return (
    <button 
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 rounded-md px-5 py-2.5 cursor-pointer text-white text-sm tracking-wider font-medium border-0 outline-0 outline-none hover:bg-red-100 transition-colors duration-200"
      style={{background: siteConfig.brand.primary}}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 fill-current inline" viewBox="0 0 512 512">
        <path
          d="M467 211H301V45c0-24.853-20.147-45-45-45s-45 20.147-45 45v166H45c-24.853 0-45 20.147-45 45s20.147 45 45 45h166v166c0 24.853 20.147 45 45 45s45-20.147 45-45V301h166c24.853 0 45-20.147 45-45s-20.147-45-45-45z"
          data-original="#000000" />
      </svg>
      Load More Reviews
    </button>
  )
}

export default LoadMoreButton
