import { Analytics } from "@vercel/analytics/next";
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
