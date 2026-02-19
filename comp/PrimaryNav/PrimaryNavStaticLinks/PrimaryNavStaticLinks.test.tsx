import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";

import * as stories from "./PrimaryNavStaticLinks.stories";
import "@testing-library/jest-dom";

const { PrimaryNavStaticLinksHorizontal, PrimaryNavStaticLinksVertical } = composeStories(stories);

test("renders PrimaryNavStaticLinksHorizontal with default args", () => {
  render(<PrimaryNavStaticLinksHorizontal />);

  const primaryNavStaticLinkGroupByTestId = screen.getByTestId("lk-pr-nav-st-lk-g");
  expect(screen.getAllByRole("link").length).toBe(3);
  expect(primaryNavStaticLinkGroupByTestId).toBeInTheDocument();
});

test("renders PrimaryNavStaticLinksVertical with default args", () => {
  render(<PrimaryNavStaticLinksVertical />);

  const primaryNavStaticLinkGroupByTestId = screen.getByTestId("lk-pr-nav-st-lk-g");
  expect(screen.getAllByRole("link").length).toBe(3);
  expect(primaryNavStaticLinkGroupByTestId).toBeInTheDocument();
});
