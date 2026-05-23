// Export all page-specific loaders
export { default as HomeLoader } from "./HomeLoader";
export { default as ServicesLoader } from "./ServicesLoader";
export { default as ContactLoader } from "./ContactLoader";
export { default as AboutLoader } from "./AboutLoader";
export { default as PortfolioLoader } from "./PortfolioLoader";
export { default as DefaultLoader } from "./DefaultLoader";

// Component selector function
import HomeLoader from "./HomeLoader";
import ServicesLoader from "./ServicesLoader";
import ContactLoader from "./ContactLoader";
import AboutLoader from "./AboutLoader";
import PortfolioLoader from "./PortfolioLoader";
import DefaultLoader from "./DefaultLoader";

export type LoaderType =
  | "home"
  | "services"
  | "contact"
  | "about"
  | "portfolio"
  | "blog"
  | "careers"
  | "admin"
  | "client"
  | "technologies"
  | "default";

export function getLoaderComponent(
  loaderType: LoaderType
): React.ComponentType<any> {
  const loaderMap: Record<LoaderType, React.ComponentType<any>> = {
    home: HomeLoader,
    services: ServicesLoader,
    contact: ContactLoader,
    about: AboutLoader,
    portfolio: PortfolioLoader,
    blog: DefaultLoader,
    careers: DefaultLoader,
    admin: DefaultLoader,
    client: DefaultLoader,
    technologies: DefaultLoader,
    default: DefaultLoader,
  };

  return loaderMap[loaderType] || DefaultLoader;
}
