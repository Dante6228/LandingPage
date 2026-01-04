(function () {
  var stylesConfig = {
    product: {
      styles: {
        product: {
          "@media (min-width: 601px)": {
            "max-width": "calc(25% - 20px)",
            "margin-left": "20px",
            "margin-bottom": "50px",
          },
        },
        title: { color: "#fffcfc" },
        button: {
          color: "#000000",
          ":hover": { color: "#000000", "background-color": "#d7d7d7" },
          "background-color": "#efefef",
          ":focus": { "background-color": "#d7d7d7" },
          "border-radius": "14px",
          "padding-left": "70px",
          "padding-right": "70px",
        },
        price: { color: "#ffffff" },
        compareAt: { color: "#ffffff" },
        unitPrice: { color: "#ffffff" },
      },
      buttonDestination: "modal",
      contents: { options: false },
      text: { button: "View product" },
    },
    productSet: {
      styles: {
        products: {
          "@media (min-width: 601px)": { "margin-left": "-20px" },
        },
      },
    },
    modalProduct: {
      contents: {
        img: false,
        imgWithCarousel: true,
        button: false,
        buttonWithQuantity: true,
      },
      styles: {
        product: {
          "@media (min-width: 601px)": {
            "max-width": "100%",
            "margin-left": "0px",
            "margin-bottom": "0px",
          },
        },
        button: {
          color: "#000000",
          ":hover": { color: "#000000", "background-color": "#d7d7d7" },
          "background-color": "#efefef",
          ":focus": { "background-color": "#d7d7d7" },
          "border-radius": "14px",
          "padding-left": "70px",
          "padding-right": "70px",
        },
        title: {
          "font-family": "Helvetica Neue, sans-serif",
          "font-weight": "bold",
          "font-size": "26px",
          color: "#4c4c4c",
        },
        price: {
          "font-family": "Helvetica Neue, sans-serif",
          "font-weight": "normal",
          "font-size": "18px",
          color: "#4c4c4c",
        },
        compareAt: {
          "font-family": "Helvetica Neue, sans-serif",
          "font-weight": "normal",
          "font-size": "15.299999999999999px",
          color: "#4c4c4c",
        },
        unitPrice: {
          "font-family": "Helvetica Neue, sans-serif",
          "font-weight": "normal",
          "font-size": "15.299999999999999px",
          color: "#4c4c4c",
        },
      },
      text: { button: "Add to cart" },
    },
    cart: {
      styles: {
        button: {
          color: "#000000",
          ":hover": { color: "#000000", "background-color": "#d7d7d7" },
          "background-color": "#efefef",
          ":focus": { "background-color": "#d7d7d7" },
          "border-radius": "14px",
        },
      },
      text: { total: "Subtotal", button: "Checkout" },
    },
    toggle: {
      styles: {
        toggle: {
          "background-color": "#efefef",
          ":hover": { "background-color": "#d7d7d7" },
          ":focus": { "background-color": "#d7d7d7" },
        },
        count: {
          color: "#000000",
          ":hover": { color: "#000000" },
        },
        iconPath: { fill: "#000000" },
      },
    },
  };

  var products = [
    { id: "9853368074526", node: "product-component-1757583594381" },
    { id: "9854203265310", node: "product-component-1757584309754" },
    { id: "9854196908318", node: "product-component-1757584526496" },
    { id: "9854240424222", node: "product-component-1757585830532" } 
  ];

  var scriptURL = "https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js";
  
  if (window.ShopifyBuy) {
    if (window.ShopifyBuy.UI) {
      ShopifyBuyInit();
    } else {
      loadScript();
    }
  } else {
    loadScript();
  }

  function loadScript() {
    var script = document.createElement("script");
    script.async = true;
    script.src = scriptURL;
    (document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]).appendChild(script);
    script.onload = ShopifyBuyInit;
  }

  function ShopifyBuyInit() {
    var client = ShopifyBuy.buildClient({
      domain: "16pwff-9s.myshopify.com",
      storefrontAccessToken: "5ee9bd6b8f4b31138715d7aa8ae5bad1",
    });

    ShopifyBuy.UI.onReady(client).then(function (ui) {
      products.forEach(function (item) {
        var element = document.getElementById(item.node);
        if (element) {
            ui.createComponent("product", {
              id: item.id,
              node: element,
              moneyFormat: "%24%20%7B%7Bamount%7D%7D",
              options: stylesConfig
            });
        }
      });
    });
  }
})();