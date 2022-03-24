import { MantineProvider } from "@mantine/core";
import { Outlet } from "react-router-dom";
import "./App.css";
import Layout from "./layout/Layout";

function App() {
  return (
    <MantineProvider
      theme={{
        fontFamily: "Cabinet Grotesk",
        headings: {
          fontFamily: "Cabinet Grotesk",
          sizes: {
            h1: { fontSize: 36 },
          },
        },
      }}
    >
      <Layout>
        <Outlet />
      </Layout>
    </MantineProvider>
  );
}

export default App;
