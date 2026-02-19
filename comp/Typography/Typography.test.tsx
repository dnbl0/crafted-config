import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";

import * as stories from "./Typography.stories"; // import all stories from the stories file
import { TypographyContext, defaultTypographyPlugins } from "../common/typographyContext";
import { disclaimerReplacer } from "../Disclaimer/plugins/disclaimersReplacer";
const {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  SubTitle1,
  SubTitle2,
  Body1,
  Body1WithSuperscript,
  Body2,
  Caption,
  Disclaimer,
  Pricing,
  Label1,
  TextLink,
  ExternalLink,
  IsMultilineString,
  IsMultilineStringWithParagraphs,
} = composeStories(stories);

describe("Typography", () => {
  it("renders H1 Typography with default args", () => {
    render(<Heading1 />);

    const headingElementByTestId = screen.getByTestId("lk-tg-h1");
    const headingElementWithCorrectRole = screen.getByRole("heading", { level: 1 });

    expect(headingElementByTestId).not.toBeNull();
    expect(headingElementWithCorrectRole).not.toBeNull();
  });

  it("renders Heading2 Typography with default args", () => {
    render(<Heading2 />);

    const headingElement = screen.getByTestId("lk-tg-h2");
    const headingElementWithCorrectRole = screen.getByRole("heading", { level: 2 });

    expect(headingElement).not.toBeNull();
    expect(headingElementWithCorrectRole).not.toBeNull();
  });

  it("renders Heading3 Typography with default args", () => {
    render(<Heading3 />);

    const headingElement = screen.getByTestId("lk-tg-h3");
    const headingElementWithCorrectRole = screen.getByRole("heading", { level: 3 });

    expect(headingElement).not.toBeNull();
    expect(headingElementWithCorrectRole).not.toBeNull();
  });

  it("renders Heading4 Typography with default args", () => {
    render(<Heading4 />);

    const headingElement = screen.getByTestId("lk-tg-h4");
    const headingElementWithCorrectRole = screen.getByRole("heading", { level: 4 });

    expect(headingElement).not.toBeNull();
    expect(headingElementWithCorrectRole).not.toBeNull();
  });

  it("renders Heading5 Typography with default args", () => {
    render(<Heading5 />);

    const headingElement = screen.getByTestId("lk-tg-h5");
    const headingElementWithCorrectRole = screen.getByRole("heading", { level: 5 });

    expect(headingElement).not.toBeNull();
    expect(headingElementWithCorrectRole).not.toBeNull();
  });

  it("renders Heading6 Typography with default args", () => {
    render(<Heading6 />);

    const headingElement = screen.getByTestId("lk-tg-h6");
    const headingElementWithCorrectRole = screen.getByRole("heading", { level: 6 });

    expect(headingElement).not.toBeNull();
    expect(headingElementWithCorrectRole).not.toBeNull();
  });

  it("renders SubTitle1 Typography with default args", () => {
    render(<SubTitle1 />);

    const subTitleElement = screen.getByTestId("lk-tg-s1");

    expect(subTitleElement).not.toBeNull();
  });

  it("renders SubTitle2 Typography with default args", () => {
    render(<SubTitle2 />);

    const subTitleElement = screen.getByTestId("lk-tg-s2");

    expect(subTitleElement).not.toBeNull();
  });

  it("renders Body1 Typography with default args", () => {
    render(<Body1 />);

    const bodyElement = screen.getByTestId("lk-tg-b1");

    expect(bodyElement).not.toBeNull();
  });

  it("renders Body1 with Superscript Typography with default args", () => {
    render(
      <TypographyContext.Provider
        value={{ plugins: [...defaultTypographyPlugins, disclaimerReplacer] }}
      >
        <Body1WithSuperscript />
      </TypographyContext.Provider>
    );

    const supElements = screen.getAllByTestId("lk-tg-sup");
    expect(supElements).toHaveLength(2);
  });

  it("renders Body2 Typography with default args", () => {
    render(<Body2 />);

    const bodyElement = screen.getByTestId("lk-tg-b2");

    expect(bodyElement).not.toBeNull();
  });

  it("renders Caption Typography with default args", () => {
    render(<Caption />);

    const captionElement = screen.getByTestId("lk-tg-c1");

    expect(captionElement).not.toBeNull();
  });

  it("renders Disclaimer Typography with default args", () => {
    render(<Disclaimer />);

    const disclaimerElement = screen.getByTestId("lk-tg-d1");

    expect(disclaimerElement).not.toBeNull();
  });

  it("renders Pricing Typography with default args", () => {
    render(<Pricing />);

    const pricingElement = screen.getByTestId("lk-tg-p1");

    expect(pricingElement).not.toBeNull();
  });

  it("renders Label Typography with default args", () => {
    render(<Label1 />);

    const labelElement = screen.getByTestId("lk-tg-l1");

    expect(labelElement).not.toBeNull();
  });

  it("renders TextLink Typography with default args", () => {
    render(<TextLink />);

    const textLinkElement = screen.getByRole("link", { name: "About Page" });

    expect(textLinkElement).not.toBeNull();
  });

  it("renders ExternalLink Typography with default args", () => {
    render(<ExternalLink />);

    const externalLinkElement = screen.getByRole("link", { name: "Google" });

    expect(externalLinkElement).not.toBeNull();
  });

  it("renders isMultilineString Typography with single linebreaks converted to <br /> tags", () => {
    render(<IsMultilineString />);

    const linebreaks = screen.getAllByTestId("lk-tg-br");
    const paragraphs = screen.getAllByTestId("lk-tg-b1");

    expect(linebreaks).toHaveLength(3);
    expect(paragraphs).toHaveLength(1);
  });

  it('splits isMultilineString Typography with double-linebreaks to many instances ("paragraphs") while still converting single linebreaks to <br /> tags', () => {
    render(<IsMultilineStringWithParagraphs />);

    const linebreaks = screen.getAllByTestId("lk-tg-br");
    const paragraphs = screen.getAllByTestId("lk-tg-b1");

    expect(linebreaks).toHaveLength(2);
    expect(paragraphs).toHaveLength(4);
  });
});
