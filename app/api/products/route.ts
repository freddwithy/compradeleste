import { chromium } from "playwright";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { search } = body;

    if (!search) {
      return new Response(JSON.stringify({}), { status: 200 });
    }

    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto(
      `https://nissei.com/py/catalogsearch/result/?q=${search}`,
    );

    const productsFromNissei = await page.$$eval(
      ".product-item-info",
      (el) =>
        el.map((product) => {
          const title = product
            .querySelector(".product-item-link")
            ?.getAttribute("title");

          if (!title) {
            console.log("NO TITLE");
            return;
          }

          const img = product
            .querySelector(".main-photo .product-image-wrapper img")
            ?.getAttribute("data-src");

          if (!img) {
            console.log("NO IMG");
            return;
          }

          const price = product.querySelector(
            ".price-wrapper span",
          )?.textContent;

          if (!price) {
            console.log("NO PRICE");
            return;
          }

          const link = product
            .querySelector(".product-item-link")
            ?.getAttribute("href");

          if (!link) {
            console.log("NO LINK");
            return;
          }

          return {
            title,
            img,
            price,
            link,
          };
        }),
    );

    await page.goto(
      `https://www.mobilezone.com.py/query/%7B%22query%22%3A%22${search}%22%7D`,
    );

    const productsFromMobileZone = await page.$$eval(
      ".MuiBox-root .css-nodl6l",
      (el) =>
        el.map((product) => {
          const title = product.querySelector(".css-5jkaug")?.innerHTML;

          console.log(title);

          if (!title) {
            console.log("NO TITLE");
            return;
          }

          const img = product.querySelector(".css-0 img")?.getAttribute("src");

          if (!img) {
            console.log("NO IMG");
            return;
          }

          const price = product.querySelector(
            ".css-gg4vpm .css-wbg8o",
          )?.innerHTML;

          if (!price) {
            console.log("NO PRICE");
            return;
          }

          return {
            title,
            img,
            price,
          };
        }),
    );

    
    await page.goto(
      `https://cellshop.com.py/catalogsearch/result/?q=${search}`,
    );

    const productsFromCellShop = await page.$$eval(
      ".product-item-info",
      (el) =>
        el.map((product) => {
          const title = product.querySelector(".product-item-link")?.innerHTML;

          if (!title) {
            console.log("NO TITLE");
            return;
          }

          const img = product
            .querySelector(".product-image-wrapper img")
            ?.getAttribute("src");

          if (!img) {
            console.log("NO IMG");
            return;
          }

          const price = product.querySelector(
            ".price-wrapper span",
          )?.textContent;

          if (!price) {
            console.log("NO PRICE");
            return;
          }

          const link = product
            .querySelector(".product-item-link")
            ?.getAttribute("href");

          if (!link) {
            console.log("NO LINK");
            return;
          }

          return {
            title,
            img,
            price,
            link,
          };
        }),
    );

    const nissei = productsFromNissei.filter(
      (product) => product !== undefined,
    );
    const mobileZone = productsFromMobileZone.filter(
      (product) => product !== undefined,
    );
    const cellShop = productsFromCellShop.filter(
      (product) => product !== undefined,
    );

    await page.close();
    await browser.close();

    return new Response(JSON.stringify({ nissei, mobileZone, cellShop }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({}), { status: 500 });
  }
}
