"use client";

import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/Button";
import { useModal } from "@/components/ui/ModalProvider";
import { useToast } from "@/components/ui/ToastProvider";

export const AuthMockCard = () => {
  const { t } = useTranslation();
  const { notify } = useToast();
  const { openModal } = useModal();

  const onSignInMock = () => {
    notify("Mock SSO sign-in launched", "info");
    openModal(
      <div className="space-y-3">
        <p className="text-sm text-foreground/75">
          {t("authDescription")}
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
      <h3 className="text-lg font-semibold">{t("authTitle")}</h3>
      <p className="mt-2 text-sm text-foreground/70">
        {t("authDescription")}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button onClick={onSignInMock}>{t("authSignIn")}</Button>
        <Button variant="secondary" onClick={onManageSessions}>
          {t("authManageSessions")}
        </Button>
      </div>
    </section>
  );
};
