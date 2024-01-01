import { useLocation, useNavigate } from "react-router-dom";
import {
  Navbar,
  Button,
  IconButton,
  Menu,
  MenuHandler,
  Input,
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  ArrowLeftOnRectangleIcon,
  BuildingLibraryIcon,
  PlusIcon,
  PlusCircleIcon,
  HomeIcon,
  BuildingOffice2Icon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { useMaterialTailwindController } from "@/context";

import useAuth from "@/hooks/useAuth";

import { useState } from "react";
import useEmpresas from "@/hooks/useEmpresas";

export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");
  const { cerrarSesionAuth, auth } = useAuth();
  const {
    buscar,
    setBuscar,
    busqueda,
    handleModalNuevoCasoRol,
    handleModalNuevoCasoSuperAdmin,
  } = useEmpresas();
  const navigate = useNavigate();

  const handleclose = () => {
    cerrarSesionAuth();
    localStorage.removeItem("token");
  };

  const [seleccion, setSeleccion] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await busqueda(buscar);
    navigate("/inicio/buscar");
  };

  const handleNuevoCaso = () => {
    handleModalNuevoCasoRol();
  };

  const handleNuevoCasoSuperAdmin = () => {
    handleModalNuevoCasoSuperAdmin();
  };

  const handleNuevoCasoRoles = () => {
    handleModalNuevoCasoRol();
  };

  const handleInicio = (e) => {
    e.preventDefault();
    navigate("/inicio");
  };

  const handleEntidades = (e) => {
    e.preventDefault();
    navigate("/entidades");
  };

  const handleUsuarios = (e) => {
    e.preventDefault();
    navigate("/usuarios");
  };

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={` rounded-xl transition-all ${
        fixedNavbar
          ? "sticky top-0 z-40 py-3 shadow-md shadow-blue-gray-500/5"
          : "px-0 py-1"
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className=" flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        {auth.rol === "superAdmin" ? (
          <div className="flex">
            <div
              className=" ml-4 mt-5 p-3 hover:cursor-pointer"
              onClick={(e) => handleInicio(e)}
            >
              <Button
                title="Inicio"
                className="grid h-14 place-items-center bg-white text-black"
              >
                <HomeIcon className="h-8 w-8" />
              </Button>
            </div>
            <div
              className=" mt-5 p-3 hover:cursor-pointer"
              onClick={(e) => handleEntidades(e)}
            >
              <Button
                title="Entidades"
                className="grid h-14 place-items-center bg-white text-black"
              >
                <BuildingOffice2Icon className="h-8 w-8" />
              </Button>
            </div>
          </div>
        ) : null}

        {auth.rol === "admin" ? (
          <div className="mb-14 flex">
            <div
              className=" ml-4 mt-5 p-3 hover:cursor-pointer"
              onClick={(e) => handleInicio(e)}
            >
              <Button
                title="Inicio"
                className="grid h-14 place-items-center bg-white text-black"
              >
                <HomeIcon className="h-8 w-8" />
              </Button>
            </div>
            <div
              className=" mt-5 p-3 hover:cursor-pointer"
              onClick={(e) => handleUsuarios(e)}
            >
              <Button
                title="Entidades"
                className="grid h-14 place-items-center bg-white text-black"
              >
                <UsersIcon className="h-8 w-8" />
              </Button>
            </div>
          </div>
        ) : null}

        {auth.rol === "supervisor" && pathname === "/inicio" ? (
          <div
            className=" ml-4 mt-5 grid p-3 hover:cursor-pointer md:grid-cols-2 xl:grid-cols-4"
            onClick={(e) => handleNuevoCaso()}
          >
            <Button className="absolute -mt-4 grid h-14 place-items-center bg-white text-black">
              <PlusIcon className="h-8 w-8" />
            </Button>
          </div>
        ) : auth.rol === "supervisor" && pathname === "/resultado" ? (
          <Typography
            as="h3"
            className="ml-5 text-xl font-bold leading-6 text-gray-900"
          >
            Verificar Documento
          </Typography>
        ) : null}
        {auth.rol === "usuarios" && pathname === "/inicio" ? (
          <div
            className=" mb-14 ml-4 mt-5 grid p-3 hover:cursor-pointer md:grid-cols-2 xl:grid-cols-4"
            onClick={(e) => handleNuevoCasoRoles()}
          >
            <Button className="absolute -mt-4 grid h-14 place-items-center bg-white text-black">
              <PlusIcon className="h-8 w-8" />
            </Button>
          </div>
        ) : auth.rol === "roles" && pathname === "/resultado" ? (
          <Typography
            as="h3"
            className="ml-5 text-xl font-bold leading-6 text-gray-900"
          >
            Documento
          </Typography>
        ) : null}
        <div className="capitalize">
          {(auth.rol === "superAdmin" && pathname === "/inicio/documentos") ||
          pathname === "/inicio/buscar" ? (
            <div className="mr-auto md:mr-4 md:w-56">
              <Input
                label="Buscar por nombre de archivo"
                onChange={(e) => setBuscar(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit(e);
                  }
                }}
              />
            </div>
          ) : (auth.rol === "superAdmin" && pathname === "/documentos/") ||
            pathname === "/documentos/ver-todos" ||
            pathname === "/documentos/procesando" ||
            pathname === "/documentos/procesados" ||
            pathname === "/documentos/verificados" ? (
            <div
              className="mb-12 ml-4 mt-5 grid p-3 hover:cursor-pointer md:grid-cols-2 xl:grid-cols-4"
              onClick={(e) => handleNuevoCasoSuperAdmin()}
            >
              <Button className="absolute -mt-4 grid h-14 place-items-center bg-white text-black">
                <PlusIcon className="h-8 w-8" />
              </Button>
            </div>
          ) : null}
        </div>

        <div className="wd flex items-center">
          <Button
            variant="text"
            color="blue-gray"
            className="hidden items-center gap-1 px-4 xl:flex"
          >
            <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
            {auth.nombre} {auth.apellido}
          </Button>
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
          >
            <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
          </IconButton>

          <Menu>
            <MenuHandler>
              <IconButton
                variant="text"
                onClick={handleclose}
                color="blue-gray"
              >
                <ArrowLeftOnRectangleIcon
                  className="h-5 w-5 text-blue-gray-500"
                  onClick={handleclose}
                />
              </IconButton>
            </MenuHandler>
          </Menu>
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
