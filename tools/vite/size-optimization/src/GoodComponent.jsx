// Импорт из ES Modules (Tree Shakable)
import { join } from 'lodash-es';

export const GoodComponent = () => {
  const result = join(['Good', 'Import'], ' ');
  return <div>{result}</div>;
};