import contract from "../config/contract";

export class ContractService {
  async getRole(address: string) {
    try {
      const role = await contract.roles(address);
      return role;
    } catch (error) {
      throw error;
    }
  }
}

export default new ContractService();
