type JWTPayload = {
  userId: string;
  role: Role;
};

type ReqUser = {
  id: string;
  name: string | null;
  email: string;
  role: Role;
  status: "ACTIVE" | "INACTIVE" | "PROSPECT";
};

type Role = "ADMIN" | "SUPER_ADMIN" | "BREEDER";

export type { JWTPayload, ReqUser, Role };
