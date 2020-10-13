interface Response {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export const responseData = (
  ok: boolean = false,
  error: string | null = null,
  token: string | null = null
): Response => {
  return {
    ok,
    error,
    token,
  };
};
export const respType = typeof responseData;
