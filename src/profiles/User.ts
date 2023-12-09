import mercury from '@mercury-js/core';

const rules = [  
  {
    modelName: 'User',
    access: {
      create: false,
      read: true,
      update: false,
      delete: true,
    },
  },
  {
    modelName: 'Test',
    access: {
      create: false,
      read: true,
      update: false,
      delete: true,
    },
  },
];


export const UserProfile = mercury.access.createProfile('USER', rules);
