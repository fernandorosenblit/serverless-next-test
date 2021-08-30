const buildMeta = (endpoint, data) => {
  const filteredEndpoint = endpoint.replace(/\?.*$/, '');
  const query = endpoint.slice(filteredEndpoint.length);
  const meta = {
    [filteredEndpoint]: {}
  };

  query
    ? (meta[filteredEndpoint][endpoint.slice(filteredEndpoint.length)] = data)
    : (meta[filteredEndpoint] = data);

  return meta;
};

export default buildMeta;
