import { DashboardLayout } from "./components/layouts/dashboard-layout";
import { ThemeProvider } from "./components/theme-provider";

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="dashboard-theme">
      <DashboardLayout />
    </ThemeProvider>
  )
}