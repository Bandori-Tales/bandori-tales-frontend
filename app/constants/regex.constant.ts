export const AUTH_REGEX = {
  symbol: /[^A-Za-z0-9]/,
  upper: /[A-Z]/,
  lower: /[a-z]/,
  number: /[0-9]/,
  phone: /^(\+62|0)[0-9]+$/,
  phonePrefix: /^(08|\+628)/,
  emailSpace: /^\S+$/,
  httpsUrl:
    /^https:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,
};
