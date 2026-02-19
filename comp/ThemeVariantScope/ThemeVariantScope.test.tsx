import { composeStory } from "@storybook/react";
import { render } from "@testing-library/react";

import { GlobalStylesScope } from "@/components/GlobalStylesScope/GlobalStylesScope";
import { lightTheme } from "@/theming/themes";

import "@testing-library/jest-dom";

import Meta, { AltVariant, DefaultVariant } from "./ThemeVariantScope.stories";

const Default = composeStory(DefaultVariant, Meta);
const Alt = composeStory(AltVariant, Meta);

describe("ThemeVariantScope", () => {
  it("Renders", () => {
    const { container } = render(<Default />);
    expect(container).toBeTruthy();
  });

  it("Renders with correct class", () => {
    const { container } = render(
      <GlobalStylesScope themeDefinition={lightTheme}>
        <Default />
      </GlobalStylesScope>
    );
    expect(container.firstChild?.firstChild).toHaveClass("isContents");
    expect(container.firstChild?.firstChild).toHaveClass("ldVariantDefault");
  });

  it("Renders with correct class", () => {
    const { container } = render(
      <GlobalStylesScope themeDefinition={lightTheme}>
        <Alt />
      </GlobalStylesScope>
    );
    expect(container.firstChild?.firstChild).toHaveClass("ldVariantAlt");
  });
});
