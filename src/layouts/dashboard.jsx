import { Routes, Route } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout";
import routes from "@/routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";

export function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;
  const { auth, cargando } = useAuth();

  return (
    <>
      {auth._id && auth.rol === "admin" ? (
        <div className="min-h-screen bg-blue-gray-50/50">
          <Sidenav
            routes={routes}
            brandImg={
              sidenavType === "dark"
                ? "../../public/img/sideLogo.png"
                : "../../public/img/sideLogo.png"
            }
          />
          <div className="p-4 xl:ml-80">
            <DashboardNavbar />
            <Configurator />
            <IconButton
              size="lg"
              color="white"
              className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
              ripple={false}
              onClick={() => setOpenConfigurator(dispatch, true)}
            >
              <Cog6ToothIcon className="h-5 w-5" />
            </IconButton>
            <Routes>
              {routes.map(
                ({ layout, pages }) =>
                  layout === "inicio" &&
                  pages.map(({ path, element }) => (
                    <Route exact path={path} element={element} />
                  ))
              )}
            </Routes>
            <div className="text-blue-gray-600">
              <Footer />
            </div>
          </div>
        </div>
      ) : auth._id && auth.rol === "vendedor" ? (
        <div className="min-h-screen bg-blue-gray-50/50">
          <div className="p-4 xl:ml-80">
            <DashboardNavbar />
            <Configurator />
            <IconButton
              size="lg"
              color="white"
              className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
              ripple={false}
              onClick={() => setOpenConfigurator(dispatch, true)}
            >
              <Cog6ToothIcon className="h-5 w-5" />
            </IconButton>
            <Routes>
              {routes.map(
                ({ layout, pages }) =>
                  layout === "inicio" &&
                  pages.map(({ path, element }) => (
                    <Route exact path={path} element={element} />
                  ))
              )}
            </Routes>
            <div className="text-blue-gray-600">
              <Footer />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
