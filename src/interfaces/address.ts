export interface IAddress {
  id: string;
  cep: string;
  estado: string;
  pais: string;
  municipio: string;
  bairro: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  latitude?: number;
  longitude?: number;
}

export interface IAddressUpdate {
  cep?: string;
  estado?: string;
  pais?: string;
  municipio?: string;
  bairro?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  latitude?: number;
  longitude?: number;
}
