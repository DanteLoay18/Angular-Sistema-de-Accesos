export const APP_LOCAL_STORAGE = {
  SAC_TOKEN_KEY: 'token',
};
export const APP_FORM_VALIDATOR = {
  // RE = REGULAR_EXPRESSION
  SAC_RE_NUMERO: '/^[0-9]d*$/',
  SAC_RE_NUMERO_2: '^[0-9]+$',
  SAC_RE_DNI: '^[0-9]{8,8}$',
  SAC_RE_CE: '^[A-Za-z0-9]{9,12}$',
  SAC_RE_RUC: '^[0-9]{11,11}$',
  SAC_RE_LETRAS: '^[áéíóúñA-Za-z ]*[áéíóúñA-Za-z][áéíóúñA-Za-z ]*$',
  SAC_RE_LETRAS_MAYUSCULAS: '^[áéíóúñÁÉÍÓÚÑA-Za-z ]*[áéíóúñÁÉÍÓÚÑA-Za-z][áéíóúñÁÉÍÓÚÑA-Za-z ]*$',
  SAC_RE_NOMBRES_APELLIDOS : '^[áéíóúñÁÉÍÓÚÑäëïöüÄËÏÖÜA-Za-z][áéíóúñÁÉÍÓÚÑäëïöüÄËÏÖÜA-Za-z ,.\'-]+$',
  SAC_RE_TELEFONO_CELULAR: '^[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]+$',
};

export const APP_CLOSE_MODAL = {
  SAC_CLOSE_MODAL_LABEL : 'Cerrar',
  SAC_CLOSE_MODAL_ICON : 'arrow_back'
}
