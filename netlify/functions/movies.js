import fetch from "node-fetch";
import { JSDOM } from "jsdom";

export const handler = async () => {
  return fetch(
    "https://www.imdb.com/search/title/?groups=top_250&sort=user_rating"
  )
    .then((response) => response.text())
    .then((html) => {
      const movies = [];

      const dom = new JSDOM(html);
      dom.window.document
        .querySelectorAll(".list .lister-item")
        .forEach((movie) => {
          movies.push(
            movie
              .querySelector(".lister-item-header")
              .textContent.trim()
              .split("\n")
              .map((x) => x.trim())
              .filter((x) => !!x)
              .join(" ")
          );
        });

      return { statusCode: 200, body: movies };
    })
    .catch((err) => {
      return { statusCode: 500, body: String(err) };
    });
};
