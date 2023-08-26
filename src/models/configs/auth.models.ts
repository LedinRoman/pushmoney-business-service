export interface IAuthConfig {
  bankSettings: IBankItem[];
}

export interface IBankItem {
  bankName: string;
  bankApiKey: string;
}
