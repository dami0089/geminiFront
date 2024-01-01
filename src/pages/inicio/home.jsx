import Cargando from "@/components/Cargando";
import useAuth from "@/hooks/useAuth";
import useEmpresas from "@/hooks/useEmpresas";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { Button, Typography } from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import * as marked from "marked";

export function Home() {
  const [mensajesEnviados, setMensajesEnviados] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const { chatear, respuesta } = useEmpresas();
  const { handleCargando } = useAuth();
  const [historial, setHistorial] = useState([]);
  const endOfMessagesRef = useRef(null); // Nueva referencia

  useEffect(() => {
    if (respuesta) {
      setMensajesEnviados((mensajesAnteriores) => [
        ...mensajesAnteriores,
        { remitente: "Respuesta", contenido: respuesta },
      ]);
    }
  }, [respuesta]);

  const handleEnviarMensaje = async (e) => {
    e.preventDefault();
    if (mensaje.trim() !== "") {
      handleCargando();
      const historialActualizado = await chatear(mensaje, historial);
      setMensajesEnviados((mensajesAnteriores) => [
        ...mensajesAnteriores,
        { remitente: "Usuario", contenido: mensaje },
      ]);
      if (historialActualizado) {
        setHistorial(historialActualizado);
      }
      setMensaje("");
      handleCargando();
    } else {
      toast.error("Por favor, ingresa un mensaje válido");
    }
  };

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [mensajesEnviados]);

  return (
    <>
      <div
        className="h-screen w-full bg-cover bg-center sm:flex sm:items-start"
        style={{
          backgroundImage: `url('/public/img/render-3d-moderno-diseno-abstracto-particulas-ciberneticas.jpg')`,
        }}
      >
        <ToastContainer pauseOnFocusLoss={false} />
        <div className="mt-3 w-full text-center sm:ml-0 sm:mt-0 sm:text-left">
          <div className="relative mt-4 h-4/5 overflow-y-scroll p-2">
            {mensajesEnviados.map((mensaje, index) => (
              <div
                key={index}
                className={`mb-2 flex ${
                  mensaje.remitente === "Usuario"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                {mensaje.remitente === "Usuario" ? (
                  <p className="rounded-md bg-blue-50 bg-opacity-90 p-2 text-lg font-bold text-gray-800">
                    {mensaje.contenido}
                  </p>
                ) : (
                  <div
                    className="rounded-md bg-yellow-50 bg-opacity-90 p-2 text-lg text-gray-800"
                    dangerouslySetInnerHTML={{
                      __html: marked.marked(mensaje.contenido),
                    }}
                  ></div>
                )}
              </div>
            ))}
          </div>

          <div className="flex w-full items-center">
            <form
              className="ml-2 mr-2 mt-2 flex-grow"
              onSubmit={handleEnviarMensaje}
            >
              <textarea
                id="mensaje"
                placeholder="Escribe tu mensaje"
                className="w-full resize-none rounded-md border-2 bg-transparent font-bold text-white placeholder-gray-400"
                rows={5}
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && !e.shiftKey && handleEnviarMensaje(e)
                }
              />
            </form>
            <Button
              className="mb-2 mr-2 h-16 flex-shrink p-4"
              type="submit"
              form="idDelFormulario"
              onClick={(e) => handleEnviarMensaje(e)}
            >
              <PaperAirplaneIcon className="h-8 w-8 text-white" />
            </Button>
          </div>
        </div>
      </div>

      <Cargando />
    </>
  );
}

export default Home;
