const host = import.meta.env.VITE_APP_BACKEND;
const companions = '/companions';

export const endpoints = {

  companionCreate: host + companions + '/create',
  companionList: host + companions + '/list',
  companionUpdate: host + companions + '/update',
  companionDelete: host + companions + '/delete',
  companionModel: host + companions + '/model-companion',

}
