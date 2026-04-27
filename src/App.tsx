import { type CSSProperties, useMemo, useState } from "react";

declare global {
  interface Window {
    __MOBILE_PREVIEW_CONFIG__?: {
      previewUrl?: string;
    };
  }
}

type Device = {
  label: string;
  width: number;
  height: number;
};

const DEFAULT_PREVIEW_URL = "/__expo_preview/";

const DEVICES: Device[] = [
  { label: "iPhone 15", width: 393, height: 852 },
  { label: "iPhone SE", width: 375, height: 667 },
  { label: "Pixel 8", width: 412, height: 915 },
  { label: "Small Android", width: 360, height: 740 },
];

function getInitialPreviewUrl() {
  return (
    window.__MOBILE_PREVIEW_CONFIG__?.previewUrl ||
    import.meta.env.VITE_PREVIEW_URL ||
    DEFAULT_PREVIEW_URL
  );
}

export function App() {
  const [previewUrl, setPreviewUrl] = useState(getInitialPreviewUrl);
  const [selectedDevice, setSelectedDevice] = useState(DEVICES[0]);
  const [isLandscape, setIsLandscape] = useState(false);
  const [frameKey, setFrameKey] = useState(0);

  const viewport = useMemo(() => {
    const { width, height } = selectedDevice;
    return isLandscape
      ? { width: height, height: width }
      : { width, height };
  }, [isLandscape, selectedDevice]);

  return (
    <main className="page-shell">
      <section className="controls" aria-label="Preview controls">
        <div>
          <p className="eyebrow">Expo Web Wrapper</p>
          <h1>Mobile Preview</h1>
        </div>

        <label className="field">
          <span>Preview URL</span>
          <input
            value={previewUrl}
            onChange={(event) => setPreviewUrl(event.target.value)}
            placeholder={DEFAULT_PREVIEW_URL}
            spellCheck={false}
          />
        </label>

        <label className="field">
          <span>Device</span>
          <select
            value={selectedDevice.label}
            onChange={(event) => {
              const nextDevice = DEVICES.find(
                (device) => device.label === event.target.value,
              );

              if (nextDevice) {
                setSelectedDevice(nextDevice);
              }
            }}
          >
            {DEVICES.map((device) => (
              <option key={device.label} value={device.label}>
                {device.label} ({device.width}x{device.height})
              </option>
            ))}
          </select>
        </label>

        <div className="button-row">
          <button type="button" onClick={() => setIsLandscape((value) => !value)}>
            {isLandscape ? "Portrait" : "Landscape"}
          </button>
          <button type="button" onClick={() => setFrameKey((key) => key + 1)}>
            Reload
          </button>
        </div>
      </section>

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
            key={frameKey}
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
