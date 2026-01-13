import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      // Close modal when clicking outside of it
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          handler();
        }
      }

      document.addEventListener("click", handleClickOutside, listenCapturing); //true for capturing phase instead of bubbling
      return () => {
        document.removeEventListener(
          "click",
          handleClickOutside,
          listenCapturing
        ); //true for capturing phase instead of bubbling
      };
    },
    [handler, listenCapturing]
  );
  return ref; // Return the ref to be attached to the modal window
}
