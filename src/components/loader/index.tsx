import { useEffect, useState } from "preact/hooks";
import "./index.css";

export default function Loader({ onClick }: { onClick?: () => void }) {
  const [loader, setLoader] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const elements = document.querySelectorAll(".overflow-y-auto");

    const handleScroll = (element: HTMLElement) => {
      if (scrolling) return;

      const isAtBottom =
        element.scrollHeight - element.scrollTop - 0.5 <= element.clientHeight;

      if (isAtBottom) {
        setScrolling(true);
        setLoader(true);
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          onClick && onClick();
          setLoader(false);
          element.scrollBy({
            top: -60,
            behavior: "smooth",
          });
          setTimeout(() => {
            setScrolling(false);
          }, 500); // 等待滚动完成后再重置滚动标志
        }, 1000);
      }
    };

    const debouncedHandleScroll = (element: HTMLElement) => {
      let scrollTimeoutId: NodeJS.Timeout;
      return () => {
        if (scrollTimeoutId) {
          clearTimeout(scrollTimeoutId);
        }
        scrollTimeoutId = setTimeout(() => handleScroll(element), 100);
      };
    };

    const scrollHandlers: (() => void)[] = [];

    elements.forEach((element) => {
      const debouncedScrollHandler = debouncedHandleScroll(
        element as HTMLElement
      );
      element.addEventListener("scroll", debouncedScrollHandler);
      scrollHandlers.push(() =>
        element.removeEventListener("scroll", debouncedScrollHandler)
      );
      console.log("已附加滚动事件监听器");
    });

    return () => {
      scrollHandlers.forEach((removeHandler) => removeHandler());
    };
  }, [scrolling]);

  return (
    <>
      {loader && (
        <div className="p-4 w-full flex justify-center">
          <div className="loader" />
        </div>
      )}
    </>
  );
}
