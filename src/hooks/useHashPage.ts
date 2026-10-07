import { useEffect, useState } from "react";

export function useHashPage() {
  const [hash, setHash] = useState(() => window.location.hash.replace("#", ""));

  useEffect(() => {
    const onHash = () => setHash(window.location.hash.replace("#", ""));
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  if (hash === "privacy") return "privacy";
  if (hash === "terms") return "terms";
  return "home";
}
