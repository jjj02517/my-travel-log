"use client";

import { useEffect, useState } from "react";

export default function MswProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    import("@/msw/browser").then(({ worker }) => {
      worker.start().then(() => {
        console.log("[MSW] Mocking started");
        setReady(true);
      });
    });

    // if (process.env.NODE_ENV === "development") {
    //   import("@/msw/browser").then(({ worker }) => {
    //     worker.start().then(() => {
    //       console.log("[MSW] Mocking started");`
    //       setReady(true);
    //     });
    //   });
    // } else {
    //   setReady(true); // prod에서는 바로 렌더
    // }
  }, []);

  if (!ready) return null;
  return <>{children}</>;
}
