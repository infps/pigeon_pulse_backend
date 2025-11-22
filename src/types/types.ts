type JWTPayload = {
  id: number;
};

type ReqUser = {
  id:number;
  email: string | null;
};

type Role = "ADMIN" | "SUPER_ADMIN" | "BREEDER";

export type { JWTPayload, ReqUser, Role };
