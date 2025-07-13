import { Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto pt-8 border-t border-border bg-card">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center gap-4">
          <a
            href="https://github.com/prompt-and-circumstance/2025-07-26-workshop"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="size-5" />
          </a>
          <div className="w-px h-4 bg-border"></div>
          <span className="text-sm text-muted-foreground">
            {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </footer>
  );
}
