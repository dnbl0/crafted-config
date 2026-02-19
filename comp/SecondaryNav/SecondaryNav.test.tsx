import { composeStory } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Meta, { Default as DefaultStory } from "./SecondaryNav.stories";

const Default = composeStory(DefaultStory, Meta);

describe("SecondaryNav", () => {
  it("Renders", () => {
    render(<Default />);
    expect(screen.getByRole("navigation")).toBeVisible();
    expect(screen.getAllByRole("listitem")).toHaveLength(5);
  });

  it("Has a heading", () => {
    render(<Default />);
    expect(screen.getByRole("heading", { level: 2, name: "Secondary Nav" })).toBeVisible();
  });

  it("Has a link labelled by the heading", () => {
    render(<Default />);
    expect(screen.getByRole("link", { name: "Secondary Nav" })).toBeVisible();
  });

  it.each([
    { label: "Link to page 1", href: "#1" },
    { label: "Link to page 2", href: "#2" },
    { label: "Link to page 3", href: "#3" },
    { label: "Link to page 4", href: "#4" },
    { label: "Link to page 5", href: "#5" },
  ])("Has a navigation link called '$label' with link to '$href'", ({ label, href }) => {
    render(<Default />);
    expect(screen.getByRole("link", { name: label })).toHaveAttribute("href", href);
  });
});
