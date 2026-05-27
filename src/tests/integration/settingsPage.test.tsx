import { fireEvent, screen } from "@testing-library/react";

import SettingsPage from "@/app/settings/page";

import { renderWithProviders } from "../test-utils";

describe("SettingsPage", () => {
  it("renders settings controls and supports mock auth actions", () => {
    renderWithProviders(<SettingsPage />);

    expect(screen.getByRole("link", { name: /back to dashboard/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign in with sso/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /manage sessions/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /light/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /dark/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /system/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /sign in with sso/i }));
    fireEvent.click(screen.getByRole("button", { name: /manage sessions/i }));
  });
});