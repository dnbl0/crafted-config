import { ImageDataDetailed } from "@/types/graphqlResponse";

import { imageDataDetailedToImageData } from "./PrimaryNav.mappers";

import "@testing-library/jest-dom";

test("almost same if an ImageDataDetailed instance does not include jsonValue", () => {
  const raw: ImageDataDetailed = {
    src: "http://abc.com/abc.png",
    alt: "A image",
  };
  const converted = imageDataDetailedToImageData(raw);
  expect(converted.src).toEqual(raw.src);
  expect(converted.alt).toEqual(raw.alt);
});

test("src in json value has higher priority", () => {
  const raw: ImageDataDetailed = {
    src: "http://abc.com/abc.png",
    jsonValue: {
      value: {
        src: "-/media/project/lexus.svg",
      },
    },
  };
  const converted = imageDataDetailedToImageData(raw);
  expect(converted.src).toEqual("/-/media/project/lexus.svg");
});
