import { useEffect } from "react";

const SCRIPT_SRC = "https://vlibras.gov.br/app/vlibras-plugin.js";
const APP_URL = "https://vlibras.gov.br/app";

declare global {
  interface Window {
    VLibras?: { Widget: new (appUrl: string) => unknown };
  }
}

// Evita carregar o script e criar o widget duas vezes (StrictMode roda o effect 2x).
let initialized = false;

/** Renderize uma única vez, na raiz do app (fora das rotas). */
export default function VLibras() {
  useEffect(() => {
    if (initialized) return;
    initialized = true;

    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => new window.VLibras!.Widget(APP_URL);
    document.body.appendChild(script);
  }, []);

  // `vw` não tem hífen, então o TypeScript não aceita direto no JSX: vai via spread.
  return (
    <div {...{ vw: "" }} className="enabled">
      <div vw-access-button="" className="active" />
      <div vw-plugin-wrapper="">
        <div className="vw-plugin-top-wrapper" />
      </div>
    </div>
  );
}
