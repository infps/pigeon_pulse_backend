type JWTPayload = {
  userId: string;
};

type ReqUser = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  status: "ACTIVE" | "INACTIVE" | "PROSPECT";
};

type Role = "ADMIN" | "SUPER_ADMIN" | "BREEDER";

export type { JWTPayload, ReqUser, Role };
