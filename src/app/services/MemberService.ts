import axios from "axios";
import { serverApi } from "../../lib/config";
import { Member } from "../../lib/types/member";

class MemberService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  public async getMembers(): Promise<Member[]> {
    try {
      let url = `${this.path}/member/top-users`;
      const result = await axios.get(url);
      return result.data;
    } catch (err) {
      console.log("Error, getMembers", err);
      throw err;
    }
  }

  public async getRestaurant(): Promise<Member> {
    try {
      let url = `${this.path}/member/restaurant`;
      const result = await axios.get(url);
      return result.data as Member;
    } catch (err) {
      console.log("Error, getRestaurant", err);
      throw err;
    }
  }
}

export default MemberService;
