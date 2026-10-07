import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUp,
  BarChart3,
  Copy,
  Database,
  Edit,
  FileText,
  Layers,
  LogOut,
  MessageSquare,
  Paperclip,
  UploadCloud,
  X,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const MAX_QUERIES = 4;
const MAX_FILE_SIZE = 200 * 1024;
const MAX_FILE_SIZE_LABEL = `${Math.round(MAX_FILE_SIZE / 1024)} KB`;

type UploadedFile = {
  file: File;
  id: string;
};

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type FileRequirement = "any" | "pdf" | "excel2";

const suggestions: {
  icon: typeof BarChart3;
  title: string;
  desc: string;
  fileRequirement: FileRequirement;
}[] = [
  {
    icon: BarChart3,
    title: "Analyze revenue",
    desc: "Show revenue trends by region for the last 6 months",
    fileRequirement: "any",
  },
  {
    icon: FileText,
    title: "Summarize report",
    desc: "Extract key insights from my uploaded PDF",
    fileRequirement: "pdf",
  },
  {
    icon: Database,
    title: "Compare data",
    desc: "Compare two Excel files and highlight differences",
    fileRequirement: "excel2",
  },
  {
    icon: Layers,
    title: "Find patterns",
    desc: "Identify top-performing categories in my data",
    fileRequirement: "any",
  },
];

const FILE_REQUIREMENT_MESSAGE: Record<FileRequirement, string> = {
  any: "Please upload a file first. This prompt analyzes your uploaded data, so attach an Excel or PDF file before running it.",
  pdf: "Please upload a PDF first. This prompt summarizes an uploaded report, so attach a .pdf file before running it.",
  excel2: "Please upload two Excel files first. This prompt compares two spreadsheets, so attach both .xlsx/.xls files before running it.",
};

function FileIcon({ name }: { name: string }) {
  if (/\.pdf$/i.test(name)) {
    return (
      <FileText
        size={13}
        className="shrink-0 text-red-400"
        aria-hidden="true"
      />
    );
  }

  return (
    <BarChart3
      size={13}
      className="shrink-0 text-emerald-500"
      aria-hidden="true"
    />
  );
}

function FileRequiredModal({
  message,
  onClose,
  onAttach,
}: {
  message: string;
  onClose: () => void;
  onAttach: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="file-required-title"
      >
        <div
          className="absolute inset-0 bg-navy/50 backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 8 }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-sm overflow-hidden rounded-[20px] border border-line-strong bg-card p-7 text-center shadow-[0_32px_80px_rgb(12_18_32/0.18)] sm:p-8"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-canvas-2 hover:text-ink"
          >
            <X size={16} />
          </button>

          <div className="mx-auto flex size-11 items-center justify-center rounded-[14px] bg-accent-soft">
            <UploadCloud size={20} className="text-accent" />
          </div>

          <h2 id="file-required-title" className="mt-5 text-lg font-semibold tracking-tight text-ink">
            File upload required
          </h2>
          <p className="mt-3 text-[13.5px] leading-6 text-muted">{message}</p>

          <div className="mt-6 flex flex-col gap-2.5">
            <button
              type="button"
              onClick={onAttach}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-[10px] bg-accent text-sm font-medium text-white transition-colors hover:bg-accent-2"
            >
              <Paperclip size={15} />
              Attach a file
            </button>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-11 w-full items-center justify-center rounded-[10px] border border-line-strong bg-card text-sm font-medium text-ink transition-colors hover:bg-canvas-2"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function ThinkingDots() {
  return (
    <div className="flex items-center gap-1 px-1 py-2">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="size-2 rounded-full bg-muted"
          style={{
            animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-6px);
          }
        }
      `}</style>
    </div>
  );
}

/**
 * Markdown renderer
 *
 * Important:
 * We intentionally do not use `node.children` directly.
 * ReactMarkdown already renders children and passes them through
 * the component props. This avoids the ElementContent[] vs ReactNode
 * TypeScript errors.
 */
function MarkdownContent({ text }: { text: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="mb-4 mt-6 text-[24px] font-bold tracking-tight text-ink first:mt-0">
            {children}
          </h1>
        ),

        h2: ({ children }) => (
          <h2 className="mb-3 mt-6 text-[20px] font-semibold tracking-tight text-ink">
            {children}
          </h2>
        ),

        h3: ({ children }) => (
          <h3 className="mb-2 mt-5 text-[18px] font-semibold text-ink">
            {children}
          </h3>
        ),

        h4: ({ children }) => (
          <h4 className="mb-2 mt-4 text-[16px] font-semibold text-ink">
            {children}
          </h4>
        ),

        h5: ({ children }) => (
          <h5 className="mb-1 mt-3 text-[14px] font-semibold text-ink">
            {children}
          </h5>
        ),

        h6: ({ children }) => (
          <h6 className="mb-1 mt-3 text-[13px] font-semibold text-ink">
            {children}
          </h6>
        ),

        p: ({ children }) => (
          <p className="mb-4 text-[14.5px] leading-[1.75] text-ink last:mb-0">
            {children}
          </p>
        ),

        ul: ({ children }) => (
          <ul className="mb-4 list-disc space-y-1.5 pl-6 text-[14.5px] leading-[1.7] text-ink">
            {children}
          </ul>
        ),

        ol: ({ children }) => (
          <ol className="mb-4 list-decimal space-y-1.5 pl-6 text-[14.5px] leading-[1.7] text-ink">
            {children}
          </ol>
        ),

        li: ({ children }) => (
          <li className="pl-1 text-[14.5px] leading-[1.7] text-ink">
            {children}
          </li>
        ),

        blockquote: ({ children }) => (
          <blockquote className="mb-4 border-l-4 border-accent pl-4 text-[14.5px] italic leading-[1.7] text-ink/80">
            {children}
          </blockquote>
        ),

        hr: () => <hr className="my-6 border-t border-line" />,

        strong: ({ children }) => (
          <strong className="font-semibold text-ink">{children}</strong>
        ),

        em: ({ children }) => (
          <em className="italic">{children}</em>
        ),

        /**
         * Inline code.
         */
        code: ({ className, children }) => {
          const isCodeBlock = Boolean(className);

          if (isCodeBlock) {
            return (
              <code
                className={cn(
                  "block whitespace-pre-wrap break-words font-mono text-[13px] leading-6",
                  className,
                )}
              >
                {children}
              </code>
            );
          }

          return (
            <code className="rounded-md bg-canvas-2 px-1.5 py-0.5 font-mono text-[13px] text-ink">
              {children}
            </code>
          );
        },

        /**
         * Code blocks.
         *
         * ReactMarkdown passes the rendered code element as children,
         * so we don't access node.children.value.
         */
        pre: ({ children }) => (
          <pre className="mb-4 overflow-x-auto rounded-[12px] border border-line bg-canvas-2 p-4 text-ink">
            {children}
          </pre>
        ),

        /**
         * Responsive Markdown table.
         *
         * `children` is already a valid ReactNode here.
         */
        table: ({ children }) => (
          <div className="mb-5 w-full overflow-x-auto rounded-[14px] border border-line">
            <table className="min-w-[560px] w-full border-collapse text-left text-[13px]">
              {children}
            </table>
          </div>
        ),

        thead: ({ children }) => (
          <thead className="border-b border-line bg-canvas text-muted">
            {children}
          </thead>
        ),

        tbody: ({ children }) => (
          <tbody className="divide-y divide-line">
            {children}
          </tbody>
        ),

        tr: ({ children }) => (
          <tr className="transition-colors hover:bg-canvas-2/60">
            {children}
          </tr>
        ),

        th: ({ children }) => (
          <th className="whitespace-nowrap px-3 py-2.5 text-left text-[12px] font-semibold text-ink">
            {children}
          </th>
        ),

        td: ({ children }) => (
          <td className="px-3 py-2.5 align-top text-[13px] leading-5 text-ink">
            {children}
          </td>
        ),

        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline decoration-accent/30 underline-offset-2 transition-colors hover:text-accent-2 hover:decoration-accent"
          >
            {children}
          </a>
        ),
      }}
    >
      {text}
    </ReactMarkdown>
  );
}

function AiResponse({ content }: { content: string }) {
  const [copied, setCopied] = useState(false);

  async function copyResponse() {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="flex gap-3 justify-start">
      <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border border-line bg-card shadow-sm">
        <img
          src="/DAOne_Blue logo.png"
          alt="DA One"
          className="h-4 w-auto dark:brightness-0 dark:invert"
        />
      </div>

      <div className="min-w-0 max-w-[85%] animate-fade-in-up">
        <div className="text-[14.5px] leading-[1.75] text-ink">
          <MarkdownContent text={content} />
        </div>

        <div className="mt-3 flex items-center gap-1">
          <button
            type="button"
            onClick={copyResponse}
            title={copied ? "Copied" : "Copy response"}
            className="inline-flex items-center gap-1.5 rounded-[7px] px-2 py-1.5 text-[12px] font-medium text-muted transition-colors hover:bg-canvas-2 hover:text-ink"
          >
            <Copy size={13} aria-hidden="true" />
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}

function signOut() {
  localStorage.removeItem("da_token");
  window.location.href = "/";
}

export function DashboardPage() {
  const [query, setQuery] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [fileError, setFileError] = useState("");
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [queriesRemaining, setQueriesRemaining] = useState<number | null>(
    null,
  );
  const [quotaError, setQuotaError] = useState("");
  const [trialDaysRemaining, setTrialDaysRemaining] = useState<number | null>(
    null,
  );
  const [trialActive, setTrialActive] = useState(true);
  const [fileRequiredNotice, setFileRequiredNotice] = useState<string | null>(null);

  const excelInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const attachMenuRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const token = localStorage.getItem("da_token");

  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
      return;
    }

    fetch("/api/chat/quota", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (typeof data.queriesRemaining === "number") {
          setQueriesRemaining(data.queriesRemaining);
        }
        if (typeof data.daysRemaining === "number") {
          setTrialDaysRemaining(data.daysRemaining);
        }
        if (typeof data.trialActive === "boolean") {
          setTrialActive(data.trialActive);
        }
      })
      .catch(() => {});

    fetch("/api/chat/history", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.messages)) {
          setMessages(data.messages);
        }
      })
      .catch(() => {});
  }, [token]);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      const target = event.target;

      if (
        attachMenuRef.current &&
        target instanceof Node &&
        !attachMenuRef.current.contains(target)
      ) {
        setShowAttachMenu(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  useEffect(() => {
    if (!textareaRef.current) return;

    textareaRef.current.style.height = "auto";

    textareaRef.current.style.height =
      Math.min(textareaRef.current.scrollHeight, 200) + "px";
  }, [query]);

  function addFile(file: File, type: "excel" | "pdf") {
    setFileError("");

    if (file.size > MAX_FILE_SIZE) {
      setFileError(`"${file.name}" exceeds the 200 KB limit.`);
      return;
    }

    const excelCount = uploadedFiles.filter((item) =>
      /\.(xlsx|xls)$/i.test(item.file.name),
    ).length;

    const pdfCount = uploadedFiles.filter((item) =>
      /\.pdf$/i.test(item.file.name),
    ).length;

    if (type === "excel" && excelCount >= 2) {
      setFileError("Maximum 2 Excel files allowed.");
      return;
    }

    if (type === "pdf" && pdfCount >= 1) {
      setFileError("Maximum 1 PDF file allowed.");
      return;
    }

    setUploadedFiles((previous) => [
      ...previous,
      {
        file,
        id: crypto.randomUUID(),
      },
    ]);
  }

  async function handleSend(overrideQuery?: string) {
    const q = (overrideQuery ?? query).trim();

    if (
      !q ||
      loading ||
      (queriesRemaining !== null && queriesRemaining <= 0)
    ) {
      return;
    }

    setMessages((previous) => [
      ...previous,
      {
        role: "user",
        content: q,
      },
    ]);

    setQuery("");
    setLoading(true);
    setFileError("");
    setQuotaError("");

    const form = new FormData();

    form.append("prompt", q);

    uploadedFiles.forEach((uploadedFile) => {
      form.append("files", uploadedFile.file);
    });

    try {
      const response = await fetch("/api/chat/ask", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: form,
      });

      const data = await response.json();

      if (
        response.status === 403 &&
        data.error === "trial_expired"
      ) {
        setTrialActive(false);
        setTrialDaysRemaining(0);
        setQuotaError(
          data.message ?? "Your free trial has ended.",
        );

        setMessages((previous) => previous.slice(0, -1));
        return;
      }

      if (
        response.status === 403 &&
        data.error === "quota_exceeded"
      ) {
        setQueriesRemaining(0);
        setQuotaError(
          data.message ??
            "Your free chat quota has been exhausted.",
        );

        setMessages((previous) => previous.slice(0, -1));
        return;
      }

      if (!response.ok) {
        setMessages((previous) => [
          ...previous,
          {
            role: "assistant",
            content: `Error: ${
              data.error ?? "Something went wrong."
            }`,
          },
        ]);

        return;
      }

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content: data.response,
        },
      ]);

      if (typeof data.queriesRemaining === "number") {
        setQueriesRemaining(data.queriesRemaining);
      }

      setUploadedFiles([]);
    } catch {
      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content:
            "Unable to reach the server. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const quotaExhausted =
    !trialActive || (queriesRemaining !== null && queriesRemaining <= 0);

  const hasMessages = messages.length > 0;

  return (
    <div className="flex h-screen overflow-hidden bg-canvas">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-line bg-canvas/60 sm:flex">
        <div className="flex items-center justify-between px-4 py-4">
          <img
            src="/DAOne_Blue logo.png"
            alt="DA One"
            className="h-7 w-auto dark:brightness-0 dark:invert"
          />

          <button
            type="button"
            title="New chat"
            onClick={() => {
              setMessages([]);
              setUploadedFiles([]);
              setQuery("");
              setQuotaError("");
              fetch("/api/chat/history", {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
              }).catch(() => {});
            }}
            className="flex size-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-canvas-2 hover:text-ink"
          >
            <Edit size={15} aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-2 py-2">
          {hasMessages ? (
            <div className="rounded-[10px] bg-canvas-2 px-3 py-2.5">
              <p className="truncate text-[12px] font-medium text-ink">
                {messages[0].content.slice(0, 48)}
                {messages[0].content.length > 48 ? "..." : ""}
              </p>

              <p className="mt-0.5 text-[11px] text-muted">
                Today
              </p>
            </div>
          ) : (
            <p className="px-2 text-[12px] text-muted/60">
              No conversations yet
            </p>
          )}
        </div>

        <div className="space-y-3 border-t border-line px-4 py-4">
          {trialDaysRemaining !== null && (
            <div className="flex items-center justify-between rounded-[10px] bg-canvas-2 px-3 py-2">
              <span className="text-[12px] text-muted">
                {trialActive ? "Free trial" : "Trial status"}
              </span>

              <span
                className={cn(
                  "text-[13px] font-semibold tabular-nums",
                  !trialActive || trialDaysRemaining <= 2
                    ? "text-red-500"
                    : "text-accent",
                )}
              >
                {trialActive
                  ? `${trialDaysRemaining} day${trialDaysRemaining === 1 ? "" : "s"} left`
                  : "Expired"}
              </span>
            </div>
          )}

          {queriesRemaining !== null && (
            <div className="flex items-center justify-between rounded-[10px] bg-canvas-2 px-3 py-2">
              <span className="text-[12px] text-muted">
                Queries left
              </span>

              <span
                className={cn(
                  "text-[13px] font-semibold tabular-nums",
                  queriesRemaining <= 1
                    ? "text-red-500"
                    : "text-accent",
                )}
              >
                {queriesRemaining} / {MAX_QUERIES}
              </span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={signOut}
              className="flex flex-1 items-center gap-2.5 rounded-[10px] px-3 py-2 text-[13px] font-medium text-muted transition-colors hover:bg-canvas-2 hover:text-ink"
            >
              <LogOut size={15} aria-hidden="true" />
              Sign out
            </button>
            <ThemeToggle />
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile header */}
        <header className="flex items-center justify-between border-b border-line px-4 py-3 sm:hidden">
          <img
            src="/DAOne_Blue logo.png"
            alt="DA One"
            className="h-7 w-auto dark:brightness-0 dark:invert"
          />

          <div className="flex items-center gap-2">
            {queriesRemaining !== null && (
              <span
                className={cn(
                  "text-[12px] font-medium",
                  queriesRemaining <= 1
                    ? "text-red-500"
                    : "text-muted",
                )}
              >
                {queriesRemaining}/{MAX_QUERIES}
              </span>
            )}

            <ThemeToggle />

            <button
              type="button"
              onClick={signOut}
              className="text-muted hover:text-ink"
              aria-label="Sign out"
            >
              <LogOut size={16} />
            </button>
          </div>
        </header>

        {/* Message area */}
        <div className="flex-1 overflow-y-auto">
          {hasMessages ? (
            <div className="mx-auto max-w-[960px] px-2 py-4 sm:px-4">
              <div className="space-y-8">
                {messages.map((message, index) => (
                  <div
                    key={`${message.role}-${index}`}
                    className={cn(
                      "flex gap-3",
                      message.role === "user"
                        ? "justify-end"
                        : "justify-start",
                    )}
                  >
                    {message.role === "assistant" ? (
                      <AiResponse content={message.content} />
                    ) : (
                      <div className="max-w-[80%] rounded-[18px] rounded-tr-[6px] bg-accent px-4 py-3 text-[14.5px] leading-[1.75] text-white shadow-sm">
                        {message.content}
                      </div>
                    )}
                  </div>
                ))}

                {loading && (
                  <div className="flex gap-4 justify-start">
                    <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border border-line bg-card shadow-sm">
                      <img
                        src="/DAOne_Blue logo.png"
                        alt="DA One"
                        className="h-4 w-auto dark:brightness-0 dark:invert"
                      />
                    </div>

                    <div className="rounded-[18px] rounded-tl-[6px] border border-line bg-card px-4">
                      <ThinkingDots />
                    </div>
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center px-4 pb-4">
              <div className="mb-2 flex h-20 w-48 items-center justify-center rounded-2xl border border-line bg-card shadow-sm">
                <img
                  src="/DAOne_Blue logo.png"
                  alt="DA One"
                  className="h-14 w-auto dark:brightness-0 dark:invert"
                />
              </div>

              <h1 className="mt-5 text-center text-[26px] font-semibold tracking-tight text-ink sm:text-[32px]">
                What would you like to{" "}
                <em className="italic text-accent">
                  explore
                </em>
                ?
              </h1>

              <p className="mt-2 text-center text-[14px] text-muted">
                Upload Excel or PDF files and ask anything about
                your data.
              </p>

              <div className="mt-8 grid w-full max-w-[640px] grid-cols-2 gap-3">
                {suggestions.map(
                  ({ icon: Icon, title, desc, fileRequirement }) => (
                    <button
                      key={title}
                      type="button"
                      onClick={() => {
                        const excelCount = uploadedFiles.filter((item) =>
                          /\.(xlsx|xls)$/i.test(item.file.name),
                        ).length;
                        const pdfCount = uploadedFiles.filter((item) =>
                          /\.pdf$/i.test(item.file.name),
                        ).length;

                        const meetsRequirement =
                          (fileRequirement === "any" && uploadedFiles.length > 0) ||
                          (fileRequirement === "pdf" && pdfCount >= 1) ||
                          (fileRequirement === "excel2" && excelCount >= 2);

                        if (!meetsRequirement) {
                          setFileRequiredNotice(FILE_REQUIREMENT_MESSAGE[fileRequirement]);
                          return;
                        }

                        handleSend(desc);
                      }}
                      disabled={quotaExhausted}
                      className="group flex flex-col gap-2 rounded-[16px] border border-line bg-card p-4 text-left transition-all hover:border-accent hover:shadow-[0_4px_20px_rgb(28_38_125/0.08)] disabled:opacity-40"
                    >
                      <div className="flex size-8 items-center justify-center rounded-lg bg-accent-soft text-accent">
                        <Icon size={16} aria-hidden="true" />
                      </div>

                      <p className="text-[13px] font-semibold text-ink">
                        {title}
                      </p>

                      <p className="text-[12px] leading-5 text-muted">
                        {desc}
                      </p>
                    </button>
                  ),
                )}
              </div>
            </div>
          )}
        </div>

        {/* Quota exhausted */}
        {(quotaExhausted || quotaError) && (
          <div className="mx-4 mb-3 sm:mx-6">
            <div className="rounded-[16px] border border-accent/20 bg-gradient-to-br from-accent-soft to-canvas-2 px-5 py-4 shadow-[0_4px_20px_rgb(28_38_125/0.10)]">
              <div className="flex items-start gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-accent text-white shadow-sm">
                  <Zap size={16} aria-hidden="true" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-[14px] font-semibold text-ink">
                    {!trialActive
                      ? "Your free trial has ended"
                      : `You've used all ${MAX_QUERIES} free queries`}
                  </p>

                  <p className="mt-0.5 text-[12.5px] text-muted">
                    Upgrade to DA One Pro to unlock unlimited
                    conversations, file uploads, and advanced
                    analytics.
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href="/#pricing"
                  className="inline-flex items-center gap-1.5 rounded-[10px] bg-accent px-4 py-2 text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-accent-2"
                >
                  <Zap size={13} aria-hidden="true" />
                  Upgrade to Pro
                </a>

                <a
                  href="/#contact"
                  className="inline-flex items-center gap-1.5 rounded-[10px] border border-line bg-card px-4 py-2 text-[13px] font-medium text-ink-2 transition-colors hover:border-accent hover:text-accent"
                >
                  Talk to sales
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Composer */}
        <div className="px-4 pb-5 pt-2 sm:px-6">
          <div className="mx-auto max-w-[720px]">
            {(uploadedFiles.length > 0 || fileError) && (
              <div className="mb-2 flex flex-wrap gap-2">
                {uploadedFiles.map(({ file, id }) => (
                  <div
                    key={id}
                    className="flex items-center gap-1.5 rounded-full border border-line bg-card py-1 pl-2.5 pr-2 text-[12px] text-ink-2 shadow-sm"
                  >
                    <FileIcon name={file.name} />

                    <span className="max-w-[140px] truncate">
                      {file.name}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        setUploadedFiles((previous) =>
                          previous.filter(
                            (item) => item.id !== id,
                          ),
                        )
                      }
                      className="ml-0.5 flex size-4 items-center justify-center rounded-full text-muted hover:bg-canvas-2 hover:text-ink"
                      aria-label={`Remove ${file.name}`}
                    >
                      <X size={10} aria-hidden="true" />
                    </button>
                  </div>
                ))}

                {fileError && (
                  <p className="self-center text-[12px] text-red-500">
                    {fileError}
                  </p>
                )}
              </div>
            )}

            <div className="relative rounded-[20px] border border-line-strong bg-card shadow-[0_4px_24px_rgb(12_18_32/0.07)] transition-shadow focus-within:shadow-[0_4px_32px_rgb(28_38_125/0.12)]">
              <textarea
                ref={textareaRef}
                rows={1}
                value={query}
                onChange={(event) =>
                  setQuery(event.target.value)
                }
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" &&
                    !event.shiftKey
                  ) {
                    event.preventDefault();
                    handleSend();
                  }
                }}
                placeholder={
                  quotaExhausted
                    ? "Your quota is exhausted."
                    : "Ask anything about your data…"
                }
                disabled={quotaExhausted || loading}
                className="block w-full resize-none rounded-[20px] bg-transparent px-4 py-4 pb-2 text-[15px] text-ink outline-none placeholder:text-muted/70 disabled:opacity-50"
                style={{
                  minHeight: 56,
                  maxHeight: 200,
                }}
              />

              <div className="flex items-center justify-between px-3 pb-3 pt-1">
                <div className="flex items-center gap-1">
                  <div
                    className="relative"
                    ref={attachMenuRef}
                  >
                    <button
                      type="button"
                      title="Attach file"
                      disabled={quotaExhausted}
                      onClick={() =>
                        setShowAttachMenu((value) => !value)
                      }
                      className={cn(
                        "flex items-center gap-1.5 rounded-[10px] px-2.5 py-1.5 text-[12.5px] font-medium transition-colors",
                        "text-muted hover:bg-canvas-2 hover:text-ink disabled:opacity-40",
                        showAttachMenu &&
                          "bg-canvas-2 text-ink",
                      )}
                    >
                      <Paperclip
                        size={14}
                        aria-hidden="true"
                      />
                      <span className="hidden sm:inline">
                        Attach
                      </span>
                    </button>

                    {showAttachMenu && (
                      <div className="absolute bottom-10 left-0 z-20 w-44 overflow-hidden rounded-[14px] border border-line bg-card py-1.5 shadow-[0_8px_32px_rgb(12_18_32/0.12)]">
                        <button
                          type="button"
                          onClick={() => {
                            setShowAttachMenu(false);
                            excelInputRef.current?.click();
                          }}
                          className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-[13px] text-ink transition-colors hover:bg-canvas-2"
                        >
                          <BarChart3
                            size={14}
                            className="text-emerald-500"
                            aria-hidden="true"
                          />

                          <div className="text-left">
                            <p className="font-medium">
                              Upload Excel
                            </p>

                            <p className="text-[11px] text-muted">
                              .xlsx or .xls · max 2 · {MAX_FILE_SIZE_LABEL} each
                            </p>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setShowAttachMenu(false);
                            pdfInputRef.current?.click();
                          }}
                          className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-[13px] text-ink transition-colors hover:bg-canvas-2"
                        >
                          <FileText
                            size={14}
                            className="text-red-400"
                            aria-hidden="true"
                          />

                          <div className="text-left">
                            <p className="font-medium">
                              Upload PDF
                            </p>

                            <p className="text-[11px] text-muted">
                              .pdf · max 1 · {MAX_FILE_SIZE_LABEL}
                            </p>
                          </div>
                        </button>
                      </div>
                    )}
                  </div>

                  <span className="hidden items-center gap-1 rounded-[10px] px-2.5 py-1.5 text-[12px] font-medium text-muted sm:flex">
                    <MessageSquare
                      size={13}
                      aria-hidden="true"
                    />
                    DA One 1.0
                  </span>
                </div>

                <button
                  type="button"
                  aria-label="Send"
                  onClick={() => handleSend()}
                  disabled={
                    quotaExhausted ||
                    loading ||
                    !query.trim()
                  }
                  className={cn(
                    "flex size-9 items-center justify-center rounded-full transition-all",
                    query.trim() &&
                      !quotaExhausted &&
                      !loading
                      ? "bg-accent text-white shadow-[0_2px_8px_rgb(28_38_125/0.35)] hover:bg-accent-2"
                      : "cursor-not-allowed bg-canvas-2 text-muted",
                  )}
                >
                  <ArrowUp
                    size={16}
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>

            <p className="mt-2 text-center text-[11px] text-muted/60">
              DA One may make mistakes. Verify important
              information.
            </p>
          </div>
        </div>
      </div>

      {/* Hidden file inputs */}
      <input
        ref={excelInputRef}
        type="file"
        accept=".xlsx,.xls"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];

          if (file) {
            addFile(file, "excel");
          }

          event.target.value = "";
        }}
      />

      <input
        ref={pdfInputRef}
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];

          if (file) {
            addFile(file, "pdf");
          }

          event.target.value = "";
        }}
      />

      {fileRequiredNotice && (
        <FileRequiredModal
          message={fileRequiredNotice}
          onClose={() => setFileRequiredNotice(null)}
          onAttach={() => {
            setFileRequiredNotice(null);
            setShowAttachMenu(true);
          }}
        />
      )}
    </div>
  );
}