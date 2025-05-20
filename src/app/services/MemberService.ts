import axios from "axios";
import { Messages, serverApi } from "../../lib/config";
import { LoginInput, Member, MemberInput } from "../../lib/types/member";

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

  public async signup(input: MemberInput): Promise<Member> {
    try {
      const url = `${serverApi}/member/signup`;
      const result = await axios.post(url, input, { withCredentials: true });

      const member: Member = result.data.member;
      localStorage.setItem("memberData", JSON.stringify(member));
      return member;
    } catch (err) {
      console.log("Error, signup", err);
      throw err;
    }
  }

  public async login(input: LoginInput): Promise<Member> {
    try {
      const url = `${serverApi}/member/login`;
      const result = await axios.post(url, input, { withCredentials: true });
      const member: Member = result.data.member;
      localStorage.setItem("memberData", JSON.stringify(member));
      return member;
    } catch (err) {
      console.log("Error, login", err);
      throw err;
    }
  }

  public async logout(): Promise<void> {
    try {
      const url = `${serverApi}/member/logout`;
      const result = await axios.post(url, {}, { withCredentials: true });
      console.log("logout", result);

      localStorage.removeItem("memberData");
    } catch (err) {
      console.log("Error, logout", err);
      throw err;
    }
  }
}

export default MemberService;
