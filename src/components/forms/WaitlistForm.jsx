import { useEffect, useRef, useState } from "react";

import { cx } from "../../utils/cx";
import { VARIANT, getThemeVariant } from "../../utils/theme";

const MIN_SUBMIT_DELAY_MS = 2000;

const STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  DUPLICATE: "duplicate",
  ERROR: "error",
};

const THEME_STYLES = {
  [VARIANT.FOREST_DARK]: {
    shell: "border-[#324137] bg-[#121916]/86 text-white shadow-[0_20px_50px_rgba(0,0,0,0.28)]",
    input: "border-[#2b3730] bg-[#0d1310] text-[#eef5eb] placeholder:text-[#9fb19f]",
    button: "bg-[#eef4ea] text-[#17201b] hover:bg-[#ffffff]",
    focusBorder: "focus:border-[#7ca776]",
    noteColor: "text-[#b5c6b2]",
    errorColor: "text-red-400",
  },
  [VARIANT.DARK]: {
    shell: "border-white/10 bg-white/6 text-white shadow-[0_20px_50px_rgba(0,0,0,0.28)]",
    input: "border-white/10 bg-[#120d0a] text-white placeholder:text-white/58",
    button: "bg-[#f0c48a] text-[#25170f] hover:bg-[#f6d4a5]",
    focusBorder: "focus:border-[#c88d59]",
    noteColor: "text-white/66",
    errorColor: "text-red-400",
  },
  [VARIANT.LIGHT]: {
    shell: "border-[#d9c7b4] bg-white/88 text-[#2c2018] shadow-[0_24px_60px_rgba(74,42,24,0.12)]",
    input: "border-[#d9cbbd] bg-[#fffdf9] text-[#2c2018] placeholder:text-[#826c5f]",
    button: "bg-[#2f2118] text-[#f8f1e8] hover:bg-[#483126]",
    focusBorder: "focus:border-[#c88d59]",
    noteColor: "text-[#7a6659]",
    errorColor: "text-red-600",
  },
};

function getButtonText(status, defaultLabel) {
  if (status === STATUS.LOADING) return "Joining\u2026";
  if (status === STATUS.SUCCESS || status === STATUS.DUPLICATE) return "Joined!";
  return defaultLabel;
}

export function WaitlistForm({
  dark = false,
  compact = false,
  theme = "default",
  placeholder = "Enter your email",
  buttonLabel = "Join waitlist",
  note,
}) {
  const inputRef = useRef(null);
  const mountedAt = useRef(0);

  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState(STATUS.IDLE);
  const [message, setMessage] = useState("");

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const variant = getThemeVariant(dark, theme);
  const styles = THEME_STYLES[variant];

  const busy = status === STATUS.LOADING;
  const done = status === STATUS.SUCCESS || status === STATUS.DUPLICATE;

  async function handleSubmit(event) {
    event.preventDefault();

    if (!inputRef.current?.validity.valid) {
      inputRef.current?.reportValidity();
      return;
    }

    const timeSinceMount = Date.now() - mountedAt.current;
    if (timeSinceMount < MIN_SUBMIT_DELAY_MS) {
      setStatus(STATUS.ERROR);
      setMessage("Please wait a moment before submitting.");
      return;
    }

    setStatus(STATUS.LOADING);
    setMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, company_url: honeypot }),
      });

      const data = await res.json();

      if (res.status === 429) {
        setStatus(STATUS.ERROR);
      } else if (res.status === 409) {
        setStatus(STATUS.DUPLICATE);
      } else if (data.ok) {
        setStatus(STATUS.SUCCESS);
        setEmail("");
      } else {
        setStatus(STATUS.ERROR);
      }

      setMessage(data.message);
    } catch {
      setStatus(STATUS.ERROR);
      setMessage("Network error. Please try again.");
    }
  }

  const buttonText = getButtonText(status, buttonLabel);

  const feedbackColor =
    status === STATUS.ERROR ? styles.errorColor : styles.noteColor;

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className={cx(
          "relative rounded-[20px] border p-3",
          styles.shell,
          compact
            ? "mx-auto flex w-full max-w-md flex-col gap-2 sm:flex-row"
            : "mx-auto flex w-full max-w-xl flex-col gap-3 sm:flex-row",
        )}
      >
        {/* Honeypot — invisible to users, auto-filled by bots */}
        <input
          type="text"
          name="company_url"
          autoComplete="off"
          tabIndex={-1}
          aria-hidden="true"
          className="absolute h-0 w-0 overflow-hidden opacity-0"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
        <input
          ref={inputRef}
          type="email"
          required
          aria-label="Email address"
          placeholder={placeholder}
          autoComplete="email"
          spellCheck={false}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={busy || done}
          className={cx(
            `min-w-0 flex-1 rounded-[12px] border px-5 py-3 text-sm outline-none transition ${styles.focusBorder}`,
            styles.input,
            (busy || done) && "opacity-60",
          )}
        />
        <button
          type="submit"
          disabled={busy || done}
          className={cx(
            "rounded-[12px] px-5 py-3 text-sm font-semibold transition duration-300",
            styles.button,
            (busy || done) && "opacity-60",
          )}
        >
          {buttonText}
        </button>
      </form>
      {(() => {
        const displayText = message || note;
        if (!displayText) return null;
        return (
          <p
            className={cx(
              "mt-1.5 px-1 text-center text-[12px]",
              message ? feedbackColor : styles.noteColor,
            )}
          >
            {displayText}
          </p>
        );
      })()}
    </div>
  );
}
