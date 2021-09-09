const where = (fields: { [key: string]: any }) => {
  let where: { [key: string]: any } = {};
  for (const [key, value] of Object.entries(fields)) {
    if (value) {
      where[key] = value;
      return where;
    }
  }
  return null;
};

export default where;
