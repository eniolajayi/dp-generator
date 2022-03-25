import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
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
      <NotificationsProvider autoClose={4000}>
        <Layout>
          <Outlet />
        </Layout>
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default App;
