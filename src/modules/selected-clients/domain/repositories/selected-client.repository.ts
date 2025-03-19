export interface SelectedClientRepository {
  addOrRemove(clientId: number): Promise<void>;
  findAll(
    page: number,
  ): Promise<{ data: { clientId: number }[]; total: number }>;
}
