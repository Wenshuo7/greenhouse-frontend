import { useEffect } from "react";

interface CustomWindow extends Window {
  fbAsyncInit: (() => void) | undefined;
  FB: any;
}
interface MyCustomElement extends HTMLElement {
  src?: string;
}

interface FacebookLoginResponse {
  status: string;
  authResponse: {
    accessToken: string;
    expiresIn: number;
    signedRequest: string;
    userID: string;
  };
}

const myElement = document.createElement("div") as MyCustomElement;

declare const window: CustomWindow;

export default function FacebookButton() {
  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "your-facebook-app-id",
        cookie: true,
        xfbml: true,
        version: "v12.0",
      });
    };
    (function (d, s, id) {
      let js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      myElement.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs?.parentNode?.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  function handleFacebookLogin() {
    window.FB.login(function (response: FacebookLoginResponse) {}, {
      scope: "email,user_photos",
    });
  }

  return <button onClick={handleFacebookLogin}>Login with Facebook</button>;
}
