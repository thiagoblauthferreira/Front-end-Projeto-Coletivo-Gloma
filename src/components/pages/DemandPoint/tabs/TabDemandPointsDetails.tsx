import { useDemandPointProvider } from "../context";
import { formatDate } from "../../../../utils";

const Description = ({ title, text = "" }: { title: string; text?: string }) => {
  return (
    <p className="text-base">
      <span className="font-bold">{title}:</span> {text}
    </p>
  );
};

export function TabDemandPointDetails() {
  const { demandPoint } = useDemandPointProvider();
  
  return (
    <div className="my-5">
      <div className="stats bg-white stats-vertical md:stats-horizontal shadow w-full">
        <div className="stat">
          <div className="stat-title">Total Page Views</div>
          <div className="stat-value">89,400</div>
          <div className="stat-desc">21% more than last month</div>
        </div>
        <div className="stat">
          <div className="stat-title">Total Page Views</div>
          <div className="stat-value">89,400</div>
          <div className="stat-desc">21% more than last month</div>
        </div>
        <div className="stat">
          <div className="stat-title">Total Page Views</div>
          <div className="stat-value">89,400</div>
          <div className="stat-desc">21% more than last month</div>
        </div>
      </div>

      <h2 className="py-8 pb-4 font-bold text-lg">Ponto de demanda</h2>

      <div className="card bg-white rounded-xl shadow">
        <div className="card-body p-4 grid grid-cols-1 gap-4 md:grid-cols-2 md:p-8">
          <div className="h-60 w-full rounded-2xl bg-slate-600"></div>
          <div className="space-y-4">
            <Description title="Finalizada" text={demandPoint.processed ? "Sim" : "Não"}/>
            <Description title="Abrigo" text={demandPoint.shelterName} />
            <Description title="Coordenador responsável" text={demandPoint.coordinator.name} />
            <Description title="Contato" text={demandPoint.coordinator.contact} />
            <Description
              title="Data da demanda"
              text={formatDate(demandPoint.collectionDate, "DD/MM/YYYY HH:mm:ss")}
            />
          </div>

          <div className="col-span-1">
            <h2 className="py-4 font-bold text-lg">Endereço da demanda:</h2>
            <div className="space-y-4 pl-4">
              <Description title="CEP" text={demandPoint.collectPoint.cep} />
              <Description title="Estado" text={demandPoint.collectPoint.state} />
              <Description title="País" text={demandPoint.collectPoint.country} />
              <Description
                title="Município"
                text={demandPoint.collectPoint.county}
              />
              <Description title="Bairro" text={demandPoint.collectPoint.neighborhood} />
              <Description
                title="Logradouro"
                text={demandPoint.collectPoint.street}
              />
              <Description title="Número" text={demandPoint.collectPoint.number} />
              <Description
                title="Complemento"
                text={demandPoint.collectPoint.complement}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
