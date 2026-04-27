import { type CSSProperties } from "react";

declare global {
  interface Window {
    __MOBILE_PREVIEW_CONFIG__?: {
      previewUrl?: string;
    };
  }
}

type Device = {
  width: number;
  height: number;
};

const DEFAULT_PREVIEW_URL = "/__expo_preview/";
const DEFAULT_DEVICE: Device = { width: 393, height: 852 };

function getInitialPreviewUrl() {
  return (
    window.__MOBILE_PREVIEW_CONFIG__?.previewUrl ||
    import.meta.env.VITE_PREVIEW_URL ||
    DEFAULT_PREVIEW_URL
  );
}

export function App() {
  const previewUrl = getInitialPreviewUrl();
  const viewport = DEFAULT_DEVICE;

  return (
    <main className="page-shell">
      <section className="preview-stage" aria-label="Phone preview">
        <div
          className="phone"
          style={{
            "--phone-width": `${viewport.width}px`,
            "--phone-height": `${viewport.height}px`,
          } as CSSProperties}
        >
          <div className="speaker" />
          <iframe
            title="Expo web preview"
            src={previewUrl}
            width={viewport.width}
            height={viewport.height}
          />
          <div className="home-indicator" />
        </div>
      </section>
    </main>
  );
}
