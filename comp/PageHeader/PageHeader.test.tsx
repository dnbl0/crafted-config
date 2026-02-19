import { composeStories } from "@storybook/react";
import { render } from "@testing-library/react";

import * as stories from "./PageHeader.stories";

const { PageHeaderWithDefault } = composeStories(stories);

test("PageHeader contains h1", () => {
  const { getByRole } = render(<PageHeaderWithDefault />);
  const h1Element = getByRole("heading", { level: 1 });
  expect(h1Element).not.toBeNull();
});
