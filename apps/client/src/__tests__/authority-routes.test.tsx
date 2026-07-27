import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import App from "../App";

/* @section: authority-route-test-helper */
function renderAt(path: string) {
  window.history.replaceState({}, "", path);
  return render(<App />);
}

afterEach(() => {
  document.body.innerHTML = "";
  window.history.replaceState({}, "", "/");
});

describe("approved authority routes", () => {
  it.each([
    ["/the-architect", "The method began before it had a name."],
    ["/clarityos", "The human conditions beneath transformation can be diagnosed."],
    ["/book", "A memoir beyond techniques."],
    ["/frameworks", "Fourteen pillars for consequential work."],
    ["/services", "A clear entry point for each level of responsibility."],
    ["/insights", "Field notes for the human layer."],
    ["/media", "Ideas designed to hold in the room."],
    ["/newsletter", "One pattern. One decision. One next step."],
    ["/contact", "Begin with the decision, consequence, and timeline."],
  ])("renders %s", async (path, heading) => {
    renderAt(path);
    expect(await screen.findByRole("heading", { level: 1, name: heading })).toBeTruthy();
  });

  it("renders all framework detail records through the reusable route", async () => {
    renderAt("/frameworks/constraint-based-innovation");
    expect(await screen.findByRole("heading", { level: 1, name: "Constraint-Based Innovation" })).toBeTruthy();
  });

  it("renders all launch essays through the reusable insight route", async () => {
    renderAt("/insights/ai-adoption-vs-human-readiness");
    expect(await screen.findByRole("heading", { level: 1, name: "AI Adoption vs. Human Readiness: The Pre-Governance Gap" })).toBeTruthy();
  });

  it("renders confirmed chapter records", async () => {
    renderAt("/book/chapter-09-the-pyramid-a-framework-for-everything");
    expect(await screen.findByRole("heading", { level: 1, name: "The Pyramid: A Framework for Everything" })).toBeTruthy();
  });

  it("resolves pending chapter URLs to the not-found page", async () => {
    renderAt("/book/chapter-02-pending");
    expect(await screen.findByRole("heading", { level: 1, name: "This page is outside the current architecture." })).toBeTruthy();
    await waitFor(() => expect(document.title).not.toContain("Chapter 02"));
  });
});
