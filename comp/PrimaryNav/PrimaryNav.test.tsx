import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";

import * as stories from "./PrimaryNav.stories";

const storyComponents = composeStories(stories);

const WithOpenEncoreModalLoggedOut = storyComponents.WithOpenEncoreModalLoggedOut;
const WithOpenEncoreModalLoggedIn = storyComponents.WithOpenEncoreModalLoggedIn;

window.ResizeObserver =
  window.ResizeObserver ||
  jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
  }));

test("renders WithOpenEncoreModalLoggedOut with default args", () => {
  render(<WithOpenEncoreModalLoggedOut />);

  const primaryNavModalEncoreLoginIframeByTestId = screen.queryAllByTestId(
    "lk-primary-nav-modal-encore-login-iframe"
  );
  const primaryNavModalEncoreNavItemsByTestId = screen.queryAllByTestId(
    "lk-primary-nav-modal-encore-nav-items"
  );
  const primaryNavModalEncoreStaticLinksByTestId = screen.queryAllByTestId(
    "lk-primary-nav-modal-encore-static-links"
  );

  expect(primaryNavModalEncoreLoginIframeByTestId.length).toBe(2);
  expect(primaryNavModalEncoreNavItemsByTestId.length).toBe(0);
  expect(primaryNavModalEncoreStaticLinksByTestId.length).toBe(0);
});

test("renders WithOpenEncoreModalLoggedIn with default args", () => {
  render(<WithOpenEncoreModalLoggedIn />);

  const primaryNavModalEncoreLoginIframeByTestId = screen.queryAllByTestId(
    "lk-primary-nav-modal-encore-login-iframe"
  );
  const primaryNavModalEncoreNavItemsByTestId = screen.queryAllByTestId(
    "lk-primary-nav-modal-encore-nav-items"
  );
  const primaryNavModalEncoreStaticLinksByTestId = screen.queryAllByTestId(
    "lk-primary-nav-modal-encore-static-links"
  );

  expect(primaryNavModalEncoreLoginIframeByTestId.length).toBe(0);
  expect(primaryNavModalEncoreNavItemsByTestId.length).toBe(2);
  expect(primaryNavModalEncoreStaticLinksByTestId.length).toBe(2);
});
