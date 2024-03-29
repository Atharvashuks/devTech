"use client";

import { useCallback, useRef, ReactNode } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Modal = ({ children }: { children: ReactNode }) => {
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const onDismiss = () => {
    router.push("/");
  };

  const handleClick = useCallback(
    // TODO: add this if required else not
    (e: React.MouseEvent) => {
      e.target === overlay.current && onDismiss && onDismiss();
    },
    [onDismiss, overlay]
  );

  return (
    <div ref={overlay} className="modal">
      <button
        type="button"
        onClick={onDismiss}
        className="absolute top-2.5 right-8"
      >
        <Image src="/close.svg" width={17} height={17} alt="close" />
      </button>
      <div className="modal_wrapper" ref={wrapper}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
