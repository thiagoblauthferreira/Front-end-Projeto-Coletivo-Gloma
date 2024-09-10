import React from "react";
import { Loading } from "./Loading";

const LoadingScreen = React.forwardRef<HTMLElement, { loading?: boolean }>(
  ({ loading }, ref) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
      if (!loading) {
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 500);
        return () => {
          clearTimeout(timer);
        };
      }
    }, [loading]);

    return (
      <section
        ref={ref}
        className={`
        fixed top-0 left-0 z-10 w-svw h-svh
        flex justify-center items-center bg-white
        overflow-hidden transition-all duration-500
        ${isLoading ? "visible opacity-100" : "invisible opacity-0"}
      `}
      >
        <Loading />
      </section>
    );
  }
);

LoadingScreen.displayName = "LoadingScreen";

export { LoadingScreen };
