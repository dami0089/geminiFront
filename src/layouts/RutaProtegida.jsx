import { Outlet, Navigate } from "react-router-dom";

import { DashboardNavbar, Footer } from "@/widgets/layout";

import { useMaterialTailwindController } from "@/context";
import useAuth from "@/hooks/useAuth";
import Cargando from "@/components/Cargando";

const RutaProtegida = () => {
  const { auth, cargando } = useAuth();
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;
  if (cargando) return <Cargando />;

  return (
    <>
      <div className="flex min-h-screen flex-col bg-blue-gray-50/50">
        <div className="flex-grow p-4">
          <DashboardNavbar />
          <Outlet />
        </div>
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default RutaProtegida;
