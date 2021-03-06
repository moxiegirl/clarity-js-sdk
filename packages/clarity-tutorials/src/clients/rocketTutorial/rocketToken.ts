import { Client, Receipt, Result } from "@blockstack/clarity";

export class RocketTokenClient extends Client {
  name = "rocket-token";
  filePath = "rocket-tutorial/rocket-token";

  async transfer(to: string, value: number, params: { sender: string }): Promise<Receipt> {
    const tx = this.createTransaction({
      method: { name: "transfer", args: [`'${to}`, `${value}`] }
    });
    await tx.sign(params.sender);
    const res = await this.submitTransaction(tx);
    return res;
  }

  async balanceOf(owner: string): Promise<number> {
    const query = this.createQuery({ method: { name: "balance-of", args: [`'${owner}`] } });
    const res = await this.submitQuery(query);
    return parseInt(Result.get(res));
  }

  async totalSupply(): Promise<number> {
    const query = this.createQuery({ method: { name: "get-total-supply", args: [] } });
    const res = await this.submitQuery(query);
    return parseInt(Result.get(res));
  }
}
