export const oldChangeUsersName = (name: string) => {
  return {
    type: 'CHANGEUSERNAME',
    payload: name,
  };
};
