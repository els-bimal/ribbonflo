import md5 from 'md5';
export const defaultState = {
  users: [
    {
      username: 'bimal',
      firstName: 'Bimal',
      lastName: 'Prematillake',
      contactNumber: '94711326774',
      emailAddress: 'bimal@endlinesolution.com',
      roleId: '1',
      passwordHash: md5('Hop**123'),
      resetPassword: true,
      active: true,
      homeStore: '',
      dateJoined: '2021-12-10',
      session:{
        lastDateTimeAccessed: '2022-03-20',
        lastModuleAccessed: ''
      }
    },
    {
      username: 'Tristan',
      firstName: 'Tristan',
      lastName: 'Perera',
      contactNumber: '94711326774',
      emailAddress: 'tristan@endlinesolutions.com',
      roleId: '',
      passwordHash: md5('123'),
      resetPassword: true,
      active: true,
      homeStore: '',
      dateJoined: '2015-12-10',
      session:{
        lastDateTimeAccessed: '2022-03-20',
        lastModuleAccessed: ''
      }
    },
    {
      username: 'manager1',
      firstName: 'Manager',
      lastName: 'User',
      contactNumber: '94711326774',
      emailAddress: 'bprematillake@hotmail.com',
      roleId: '2',
      passwordHash: md5('Hop**123'),
      resetPassword: true,
      active: true,
      homeStore: '',
      dateJoined: '2021-12-10',
      session:{
        lastDateTimeAccessed: '2022-03-20',
        lastModuleAccessed: ''
      }
    },
  ],
  roles: [
    {
      roleId: '1',
      RoleName: 'Administrtor',
      Description: 'Administrtor',
    },
    {
      roleId: '2',
      RoleName: 'Manager',
      Description: 'Manager',
    },
    {
      roleId: '3',
      RoleName: 'Sales',
      Description: 'Sales',
    },
  ],
  stores: [
    {
      id: '1',
      storeName: 'Store One',
      location: 'New York',
    },
    {
      id: '2',
      storeName: 'Store Two',
      location: 'Los Angeles',
    },
    {
      id: '3',
      storeName: 'Store three',
      location: 'Chicago',
    },
    {
      id: '4',
      storeName: 'Store Four',
      location: 'San Diego',
    },
  ],
};
