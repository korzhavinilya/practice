
export type UserId = string;

export type User = {
  id: UserId;
  name: string;
  description: string;
};

export const users: User[] = Array.from({ length: 1500 }, (_, index) => ({
  id: `user-${index}`,
  name: `User ${index}`,
  description: `description for User ${index}`
}));
