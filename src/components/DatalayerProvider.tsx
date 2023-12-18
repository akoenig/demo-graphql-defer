"use client";

import type { PropsWithChildren } from "react";

import { Provider, createClient } from "@/fuse/client";
import { Suspense, useMemo } from "react";
import { usePathname } from "next/navigation";

export const DatalayerProvider = (props: PropsWithChildren) => {
  const [client, ssr] = useMemo(() => {
    const { client, ssr } = createClient({
      url: "/api/fuse",
      requestPolicy: "network-only",
      suspense: true,
      fetchOptions: {
        cache: "no-store",
      },
    });

    return [client, ssr];
  }, []);

  return (
    <Provider client={client} ssr={ssr}>
      <Suspense>{props.children}</Suspense>
    </Provider>
  );
};
