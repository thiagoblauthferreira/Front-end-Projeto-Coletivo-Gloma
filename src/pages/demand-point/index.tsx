import React from "react";
import { CardPrimary } from "../../components/cards/CardPrimary";
import {
  Button,
  LoadingScreen,
  Loading,
  Skeleton,
  Tooltip,
} from "../../components/common";
import { useNavigate } from "react-router-dom";
import useInView from "../../hooks/useInView";
import { Search } from "../../components/search";
import { useAuthProvider } from "../../context/Auth";
import { toast } from "react-toastify";
import { toastMessage } from "../../helpers/toast-message";
import { IDemandPoint, IDemandPointCreate, ISearchDemandPoint } from "../../interfaces/demand-point";
import { ModalDemandPoint } from "../../components/modals/DemandPoint";
import { createDemandPoint, listDemandsPoint } from "../../services/demand-point.service";

const limit = 12;

export default function DemandsPointScreen() {
  const navigate = useNavigate();
  const { currentUser } = useAuthProvider();
  const { ref, inView } = useInView({
    rootMargin: "-10px",
    threshold: 1,
  });

  const page = React.useRef<number>(0);
  const filter = React.useRef<ISearchDemandPoint>({});

  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [requesting, setRequesting] = React.useState<boolean>(false);
  const [requestingCreate, setRequestingCreate] = React.useState<boolean>(false);
  const [infinitScroll, setInfinitScroll] = React.useState<boolean>(true);
  const [loading, setLoading] = React.useState<boolean>(true);

  const [demandPoints, setDemandPoints] = React.useState<
    IDemandPoint[]
  >([]);

  const handleRedirect = (id: string) => {
    navigate(`/demand-point/${id}`);
  };

  const handleFilter = async (data: ISearchDemandPoint) => {
    page.current = 0;
    filter.current = data;

    try {
      setRequesting(true);

      const resp = await listDemandsPoint({
        limit: limit,
        offset: page.current * limit,
        ...filter.current,
      });
      const respData = resp.data;
      const respTotal = resp.total;

      setDemandPoints(respData);
      setInfinitScroll(respTotal > limit ? respData.length > 0 : false);
      page.current++;
    } catch (error) {
      console.error(error);
      setInfinitScroll(false);
      toast.error(toastMessage.INTERNAL_SERVER_ERROR);
    } finally {
      setRequesting(false);
    }
  };

  const handleCreateDemandPoint = async (data: IDemandPointCreate) => {
    try {
      setRequestingCreate(true);
      if (!currentUser?.id) {
        toast.error(toastMessage.INTERNAL_SERVER_ERROR);
        throw new Error("Usuário ausente");
      }        
      data.coordinatorId = currentUser?.id;
      data.collectionDate = data.collectionDate + "Z"

     const respDemandPoint = await createDemandPoint(data);

      setDemandPoints((currentDistribuitionPoints) => {
        return [respDemandPoint, ...currentDistribuitionPoints];
      });

      toast.success("Ponto de distribuição criado");
    } catch (error) {
      console.error(error);
      toast.error(toastMessage.INTERNAL_SERVER_ERROR);
    } finally {
      setRequestingCreate(false);
    }
  };

  const load = async () => {
    try {
      const currentPage = page.current;

      const resp = await listDemandsPoint({
        limit: limit,
        offset: page.current * limit,
        ...filter.current,
      });
      const respData = resp.data;
      console.log(resp)
      const respTotal = resp.total;
      setDemandPoints((currentData) => [...currentData, ...respData]);
      setInfinitScroll(respTotal > limit ? respData.length > 0 : false);
      page.current++;
    } catch (error) {
      setInfinitScroll(false);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (inView) {
      load();
    }
  }, [inView]);

  return (
    <div className="py-8">
      <LoadingScreen ref={ref} loading={loading} />

      <div className="my-5">
        <p className="font-semibold mb-2">Filtrar por</p>
        <div
          className={`
            flex flex-col gap-4 md:flex-row
          `}
        >
          <Search
            className="gap-4 w-full"
            onFilter={handleFilter}
            options={[
              {
                optionKey: "search",
                type: "input",
              },
            ]}
          />

          {(currentUser?.roles.includes("coordinator") ||
            currentUser?.roles.includes("admin")) && (
            <Button
              text="Novo ponto de demanda"
              className="bg-black text-white"
              onClick={() => setOpenModal(true)}
            />
          )}
        </div>
      </div>

      {requesting ? (
        <div className="flex justify-center items-center h-[100px]">
          <Loading />
        </div>
      ) : (
        <>
          <div
            className={`
              grid grid-cols-1 gap-3
              sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
            `}
          >
            {requestingCreate && (
              <div
                className={`
                  card card-compact bg-base-100 shadow-xl
                  rounded-lg w-full overflow-hidden
                `}
              >
                <Skeleton className="w-full h-44 rounded-none" />
                <div className={`card-body`}>
                  <Skeleton className="card-title w-32 h-6" />
                  <Skeleton className="card-title w-28 h-4" />
                </div>
              </div>
            )}

            {demandPoints.map((demandPoint, index) => {
               return (
                <CardPrimary
                  key={`${demandPoint.id}-${index}`}
                  image=""
                  title={"Ponto de demanda"}
                >
                  <div>
                    <p>
                     <strong>Contato:</strong> {demandPoint.coordinator.contact}
                    </p>
                    <Tooltip text={'abrigo'}>
                      <p><strong>Solicitante</strong>{demandPoint.shelterName}</p>
                    </Tooltip>
                  </div>

                  <Button
                    className={`
                      absolute bottom-0 right-0
                      m-4 bg-slate-200 !rounded-md p-2 h-max
                      border-none
                    `}
                    onClick={() => handleRedirect(demandPoint.id)}
                    text="Ver mais"
                  />
                </CardPrimary>
              );
            })}
          </div>

          {!demandPoints ||
            (!demandPoints.length && !infinitScroll && (
              <div className="rounded-lg border border-solid border-black p-2 text-center my-5">
                <p className="B8 text-gray-1">Pontos de demanda não encontrados</p>
              </div>
            ))}

          {infinitScroll && (
            <div className="flex justify-center items-center h-[100px]" ref={ref}>
              <Loading />
            </div>
          )}
        </>
      )}

      <ModalDemandPoint
        open={openModal}
        close={() => setOpenModal(false)}
        onSubmit={handleCreateDemandPoint}
      />
    </div>
  );
}
