export const oldChangeUsersAge = (age: number) => {
  return {
    type: 'CHANGEAGE',
    payload: age,
  };
};
