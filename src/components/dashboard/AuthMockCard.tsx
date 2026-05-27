"use client";

import { Button } from "@/components/ui/Button";
import { useModal } from "@/components/ui/ModalProvider";
import { useToast } from "@/components/ui/ToastProvider";

export const AuthMockCard = () => {
  const { notify } = useToast();
  const { openModal } = useModal();

  const onSignInMock = () => {
    notify("Mock SSO sign-in launched", "info");
    openModal(
      <div className="space-y-3">
        <p className="text-sm text-foreground/75">
          This is a placeholder auth flow for the internship assignment. Wire it to NextAuth or your provider later.
        </p>
        <ul className="list-disc space-y-1 pl-5 text-sm text-foreground/65">
          <li>SSO button is active</li>
          <li>Sessions can be managed from here</li>
          <li>No real credentials are stored</li>
        </ul>
      </div>,
      "Mock authentication",
    );
  };

  const onManageSessions = () => {
    notify("Opened mock session manager", "success");
    openModal(
      <div className="space-y-2 text-sm text-foreground/75">
        <p>Active sessions: 1</p>
        <p>Device: Current browser</p>
        <p>Status: Mock only</p>
      </div>,
      "Session manager",
    );
  };

  return (
    <section className="rounded-2xl border border-border bg-surface p-5">
      <h3 className="text-lg font-semibold">Authentication (Mock)</h3>
      <p className="mt-2 text-sm text-foreground/70">
        This UI simulates enterprise SSO controls. Wire it to your auth provider for production.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button onClick={onSignInMock}>Sign in with SSO</Button>
        <Button variant="secondary" onClick={onManageSessions}>
          Manage sessions
        </Button>
      </div>
    </section>
  );
};
