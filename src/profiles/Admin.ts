import mercury from '@mercury-js/core';

const rules = [  
  {
    modelName: 'User',
    access: {
      create: true,
      read: true,
      update: true,
      delete: true,
    },
    // fieldLevelAccess?: true,      -------------> Optional Fields to set field level access control
    // fields?: {
      //fieldName : {
        // action (create, update...) : boolean     
      // }
    // }
  },
  {
    modelName: 'Test',
    access: {
      create: true,
      read: true,
      update: true,
      delete: true,
    },
  },
];


export const AdminProfile = mercury.access.createProfile('ADMIN', rules);
