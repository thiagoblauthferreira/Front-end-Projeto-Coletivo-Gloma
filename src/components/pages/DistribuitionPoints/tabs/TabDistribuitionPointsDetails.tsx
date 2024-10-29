import { useDistribuitionPointProvider } from "../context";
import { formatDate } from "../../../../utils";
import Graphic from "../../../charts/Chart";

const Description = ({ title, text = "" }: { title: string; text?: string }) => {
  return (
    <p className="text-base">
      <span className="font-bold">{title}:</span> {text}
    </p>
  );
};

export function TabDistribuitionPointDetails() {
  const { distribuitionPoint, statistics } = useDistribuitionPointProvider();

   return (
    <div className="my-5">
      <div className="stats bg-white stats-vertical md:stats-horizontal shadow w-full">
        <div className="stat">
          <div className="stat-title">Total de produtos recebidos:</div>
          <div className="stat-value">{statistics.totalQuantityProducts}</div>
          <div className="stat-desc">*Considera-se todos os tipos de produtos.</div>
        </div>
        <div className="stat">
          <div className="stat-title">Total de produtos recebidos em peso:</div>
          <div className="stat-value">{statistics.totalProducts} kg</div>
          <div className="stat-desc">*Considera-se todos os tipos alimentícios.</div>
        </div>       
      </div>
      <div className="stats bg-white shadow w-full">
        <div className="flex flex-col md:flex-row items-center justify-center w-full mb-4">
          <div className="flex items-center justify-center w-full md:w-1/2 mb-4 md:mb-0">
            <Graphic data={statistics} type={"not_food"} />
          </div>         
        </div>        
      </div>
      <div className="stats bg-white shadow w-full">
        <div className="flex flex-col md:flex-row items-center justify-center w-full mb-4">
        <div className="flex items-center justify-center w-full md:w-1/2">
            <Graphic data={statistics} type={"food"} />
          </div>      
        </div>        
      </div>

    <h2 className="py-8 pb-4 font-bold text-lg">Ponto de distribuição</h2>

      <div className="card bg-white rounded-xl shadow">
        <div className="card-body p-4 grid grid-cols-1 gap-4 md:grid-cols-2 md:p-8">
          
          <div className="space-y-4 w-full">
            <Description title="Nome" text={distribuitionPoint.name} />
            <Description title="Telefone" text={distribuitionPoint.phone} />
            <Description title="Descrição" text={distribuitionPoint.description} />
            <Description
              title="Data de criação"
              text={formatDate(distribuitionPoint.createdAt, "DD/MM/YYYY")}
            />
          </div>

          <div className="col-span-1">
            <h2 className="font-bold text-lg">Endereço:</h2>
            <div className="space-y-4 pl-4">
              <Description title="CEP" text={distribuitionPoint.address.cep} />
              <Description title="Estado" text={distribuitionPoint.address.estado} />
              <Description title="País" text={distribuitionPoint.address.pais} />
              <Description
                title="Município"
                text={distribuitionPoint.address.municipio}
              />
              <Description title="Bairro" text={distribuitionPoint.address.bairro} />
              <Description
                title="Logradouro"
                text={distribuitionPoint.address.logradouro}
              />
              <Description title="Número" text={distribuitionPoint.address.numero} />
              <Description
                title="Complemento"
                text={distribuitionPoint.address.complemento}
              />
            </div>
          </div>

          <div className="col-span-1">
            <h2 className="font-bold text-lg">Responsável:</h2>
            <div className="space-y-4 pl-4">
              <Description title="Nome" text={distribuitionPoint.creator.name} />
              <Description title="Email" text={distribuitionPoint.creator.email} />
              <Description title="Telefone" text={distribuitionPoint.creator.phone} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
