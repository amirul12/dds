export default {
  routes: [
    {
      method: 'POST',
      path: '/member-import/excel',
      handler: 'member-import.importExcel',
      config: { policies: [], middlewares: [], auth: false },
    },
    {
      method: 'POST',
      path: '/member-import/json',
      handler: 'member-import.importJson',
      config: { policies: [], middlewares: [], auth: false },
    },
    {
      method: 'GET',
      path: '/member-import/template',
      handler: 'member-import.downloadTemplate',
      config: { policies: [], middlewares: [], auth: false },
    },
    {
      method: 'DELETE',
      path: '/member-import/clean',
      handler: 'member-import.clean',
      config: { policies: [], middlewares: [], auth: false },
    },
    {
      method: 'POST',
      path: '/member-import/upload-photos',
      handler: 'member-import.uploadPhotos',
      config: { policies: [], middlewares: [], auth: false },
    },
  ],
};
