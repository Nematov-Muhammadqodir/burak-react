import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/utils";
import { MemberStatus, MemberType } from "../lib/enums/member.enum";
import { useAuthStore } from "./useAuthStore";

export interface User {
  _id: string;
  memberStatus: MemberStatus;
  memberType: MemberType;
  memberNick: string;
  memberPhone: string;
  memberPassword?: string;
  memberAddress?: string;
  memberDesc?: string;
  memberImage?: string;
  memberPoints: number;
  createdAt: Date;
  updatedAt: Date;
}
interface Message {
  _id: string;
  senderId: string;
  text: string | null;
  image: string | null;
  createdAt: string;
}

export interface ChatStore {
  users: User[];
  messages: Message[];
  selectedUser: User | null | any;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  getUsers: () => Promise<void>;
  setSelectedUser: (selectedUser: User | null) => void;
  sendMessage: (messageInput: {
    text: string | null;
    image: string | null;
  }) => Promise<void>;
  getMessages: (userId: string) => Promise<void>;
  subscribeToMessages: () => void;
  unsubscribeFromMessages: () => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const response = await axiosInstance.get<User[]>("/member/all");
      set({ users: response.data });
    } catch (error) {
      console.log("Error getUsers", error);
      toast.error("Error to get users!");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId: string) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      console.log("Error getMessages", error);
      toast.error("Error to get messages!");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageInput: {
    text: string | null;
    image: string | null;
  }) => {
    console.log("text:", messageInput.text);
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser?._id}`,
        messageInput
      );

      set({ messages: [...messages, res.data] });
    } catch (error: any) {
      console.log("Error in useChatStore sendMessage", error);
      toast.error(error.message);
    }
  },

  subscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    // Unsubscribe any existing to avoid multiple subscriptions
    socket.off("newMessage");

    socket.on("newMessage", (newMessage) => {
      const currentSelectedUser = get().selectedUser;

      const isMessageRelatedToCurrentChat =
        newMessage.senderId === currentSelectedUser?._id ||
        newMessage.receiverId === currentSelectedUser?._id;

      if (!isMessageRelatedToCurrentChat) return;

      set((state) => ({
        messages: [...state.messages, newMessage],
      }));
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket?.off("newMessage");
  },

  setSelectedUser: (selectedUser) => {
    console.log("selectedUser", selectedUser);
    set({ selectedUser });
  },
}));

// subscribeToMessages: () => {
//     const { selectedUser } = get();
//     if (!selectedUser) return;
//     //TODO:Continue after socketConnection
//     const socket = useAuthStore.getState().socket;

//     socket?.on("newMessage", (newMessage) => {
//       const isMessageSentFromSelectedUser =
//         newMessage.senderId === selectedUser._id;
//       if (!isMessageSentFromSelectedUser) return;

//       set({
//         messages: [...get().messages, newMessage],
//       });
//     });
//   },
