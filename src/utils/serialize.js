import serialize from 'serialize-javascript';

export default serialize;

export const deserialize = data => {
  return eval('(' + data + ')');
};
