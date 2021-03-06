const unique = (fields: { [key: string]: any }) => {
  let where: { [key: string]: any } = {};
  for (const [key, value] of Object.entries(fields)) {
    if (value) {
      where[key] = value;
      return where;
    }
  }
  return undefined;
};

type Operator = 'AND' | 'OR' | 'NOT';
const many = (fields: { [key: string]: any }, operator?: Operator) => {
  if (!fields || Object.keys(fields).length === 0) {
    return undefined;
  }

  if (!operator) {
    return unique(fields);
  }

  let operands: { [key: string]: any }[] = [];
  let operand: { [key: string]: any } = {};
  for (const [key, value] of Object.entries(fields)) {
    if (value) {
      operand[key] = value ? value : undefined;
      operands.push(operand);
      operand = {};
    }
  }

  if (operands.length === 0) {
    return undefined;
  }
  let where: { [key: string]: any } = {};
  where[operator] = operands;
  return where;
};

export default { unique, many };
