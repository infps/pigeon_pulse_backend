type JWTPayload = {
  userId: string;
  role: string;
};

type ReqUser = {
  id: string;
  name: string | null;
  email: string;
  role: string;
  status: "ACTIVE" | "INACTIVE" | "PROSPECT";
};

export type { JWTPayload, ReqUser };
