import "@testing-library/jest-dom";
import { composeStories } from "@storybook/react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { PrimaryNavLevel1 } from "./PrimaryNavLevel1";
import * as stories from "./PrimaryNavLevel1.stories";
import { PRIMARY_NAV_LEVEL_1_SAMPLE_DATA } from "./PrimaryNavLevel1.stories.data";
import { PrimaryNavControlsContext } from "../PrimaryNavContext";
import { Menu } from "../types/PrimaryNav.types";

const { Default } = composeStories(stories);

test("PrimaryNavLevel1 fires click event handler which provides related modalId", async () => {
  const level1ItemClickHandler = jest.fn((menu: Menu | null) => menu && menu.menuId);

  render(
    <PrimaryNavControlsContext.Provider
      value={{
        handleNavbarItemClick: level1ItemClickHandler,
        pushActiveMenuId: jest.fn(),
        popActiveMenu: jest.fn(),
        handleQuickBookClick: jest.fn(),
      }}
    >
      <Default />
    </PrimaryNavControlsContext.Provider>
  );
  const user = userEvent.setup();
  const level1Item = screen.getByRole("button", { name: /Our Dealership/i });

  await act(async () => {
    await user.click(level1Item);
  });

  expect(level1ItemClickHandler.mock.calls).toHaveLength(1);
  expect(level1ItemClickHandler.mock.results[0].value).toBe("dealer");
});

test("PrimaryNavLevel1 has aria-expanded set for active item", () => {
  render(
    <PrimaryNavLevel1
      level1Menus={PRIMARY_NAV_LEVEL_1_SAMPLE_DATA}
      activeMenu={PRIMARY_NAV_LEVEL_1_SAMPLE_DATA[0]}
    />
  );

  const level1ItemWhichShouldBeExpanded = screen.queryByRole("button", {
    name: /Our Dealership/i,
    expanded: true,
  });
  const level1ItemWhichShouldNotBeExpanded = screen.queryByRole("button", {
    name: /Our Vehicles/i,
    expanded: true,
  });

  expect(level1ItemWhichShouldBeExpanded).toBeInTheDocument();
  expect(level1ItemWhichShouldNotBeExpanded).not.toBeInTheDocument();
});
