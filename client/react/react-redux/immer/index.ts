import { produce } from 'immer';

const original = {
  users: {
    admin: { name: 'Admin', role: 'god' },
    guest: { name: 'Guest', role: 'peasant' }
  }
};

const oldJsCopy = {
  users: {
    ...original.users,
    admin: {
      ...original.users.admin,
      name: 'New Name'
    }
  }
};

const immerCopy = produce(original, (draft) => {
  draft.users.admin.name = 'New Name';
});

console.log('obj', original);
console.log('immerObj', immerCopy);
