import { registerApplication, start } from "single-spa";
import { constructRoutes } from "single-spa-layout";
import { Layout } from "single-spa-layout"; // импортируем библиотеку для работы с разметкой

const layout = `
<single-spa>
    <route path="/" application="main-app" />
    <route path="/signup" application="signup-app" />
    <route path="/signin" application="signin-app" />
</single-spa>
`;

const routes = constructRoutes(layout);

registerApplication({
  name: "main-app",
  app: () => System.import("@your-org/main-app"),
  activeWhen: ["/"],
});

registerApplication({
  name: "signup-app",
  app: () => System.import("@your-org/signup-app"),
  activeWhen: ["/signup"],
});

registerApplication({
  name: "signin-app",
  app: () => System.import("@your-org/signin-app"),
  activeWhen: ["/signin"],
});

start();