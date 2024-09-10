import React from "react";
import { CardPrimary } from "../../components/cards/CardPrimary";
import { Button, Loading, Skeleton, Tooltip } from "../../components/common";
import { LoadingScreen } from "../../components/common/LoadingScreen";
import { ISearchShelter, IShelter, IShelterCreate } from "../../interfaces/shelter";
import { createShelter, listShelters } from "../../services/shelter.service";
import { Search } from "../../components/search";
import useInView from "../../hooks/useInView";
import { useNavigate } from "react-router-dom";
import { useAuthProvider } from "../../context/Auth";
import { ModalShelter } from "../../components/modals";
import { ISearchProducts } from "../../interfaces/products";
import { toast } from "react-toastify";
import { toastMessage } from "../../helpers/toast-message";

const limit = 12;

export default function SheltersScreen() {
  const navigate = useNavigate();
  const { currentUser } = useAuthProvider();
  const { ref, inView } = useInView({
    rootMargin: "-10px",
    threshold: 1,
  });

  const page = React.useRef<number>(0);
  const filter = React.useRef<ISearchProducts>({});

  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [requesting, setRequesting] = React.useState<boolean>(false);
  const [requestingCreate, setRequestingCreate] = React.useState<boolean>(false);
  const [infinitScroll, setInfinitScroll] = React.useState<boolean>(true);
  const [loading, setLoading] = React.useState<boolean>(true);

  const [shelters, setShelters] = React.useState<IShelter[]>([]);

  const handleRedirect = (id: string) => {
    navigate(`/shelters/${id}`);
  };

  const handleFilter = async (data: ISearchShelter) => {
    page.current = 0;
    filter.current = data;

    try {
      setRequesting(true);

      const resp = await listShelters({
        limit: limit,
        offset: page.current * limit,
        ...filter.current,
      });
      const respData = resp.data;
      const respTotal = resp.total;

      setShelters(respData);
      setInfinitScroll(respTotal > limit ? respData.length > 0 : false);
      page.current++;
    } catch (error) {
      console.error(error);
    } finally {
      setRequesting(false);
    }
  };

  const handleCreateShelter = async (data: IShelterCreate) => {
    try {
      setRequestingCreate(true);

      const respShelter = await createShelter(data);

      setShelters((currentshelter) => {
        return [respShelter, ...currentshelter];
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

      const resp = await listShelters({
        limit: limit,
        offset: currentPage * limit,
        ...filter.current,
      });

      const respData = resp.data;
      const respTotal = resp.total;
      setShelters((currentData) => [...currentData, ...respData]);
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
            className="grid gap-4 grid-cols-1 md:grid-cols-3 w-full"
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
              text="Novo abrigo"
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

            {shelters.map((shelter) => {
              return (
                <CardPrimary key={shelter.id} image="" title={shelter.name}>
                  <div>
                    <p>
                      <strong>Tel:</strong> {shelter.phone}
                    </p>
                    <Tooltip text={shelter.description}>
                      <p>{shelter.description}</p>
                    </Tooltip>
                  </div>

                  <Button
                    className={`
                      absolute bottom-0 right-0
                      m-4 bg-slate-200 !rounded-md p-2 h-max
                      border-none
                    `}
                    onClick={() => handleRedirect(shelter.id)}
                    text="Ver mais"
                  />
                </CardPrimary>
              );
            })}
          </div>

          {!shelters ||
            (!shelters.length && !infinitScroll && (
              <div className="rounded-lg border border-solid border-black p-2 text-center my-5">
                <p className="B8 text-gray-1">Abrigos não encontrados</p>
              </div>
            ))}

          {infinitScroll && (
            <div className="flex justify-center items-center h-[100px]" ref={ref}>
              <Loading />
            </div>
          )}
        </>
      )}

      <ModalShelter
        open={openModal}
        close={() => setOpenModal(false)}
        onSubmit={handleCreateShelter}
      />
    </div>
  );
}
