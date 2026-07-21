import { Analytics } from "@vercel/analytics/react";
import { LandingPage } from "./pages/LandingPage";

function App() {
  return (
    <>
      <Analytics />
      <LandingPage />
    </>
  );
}

export default App;
