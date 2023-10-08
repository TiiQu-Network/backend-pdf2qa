export const getTokens = async (
  authToken: string,
): Promise<{ [key: string]: string } | false> => {
  try {
    const tokens =
      authToken
        .split(";")
        .reduce((prev: { [key: string]: string }, current) => {
          const [name, ...value] = current.split("=").map((x) => x.trim());
          prev[name] = value.join("=");
          return prev;
        }, {}) || {};

    return tokens;
  } catch (e) {
    console.error(e);
    return false;
  }
};
