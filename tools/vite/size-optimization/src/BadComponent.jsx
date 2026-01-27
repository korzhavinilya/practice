// Импорт из CommonJS библиотеки целиком
import { join } from 'lodash';

export const BadComponent = () => {
  const result = join(['Bad', 'Import'], ' ');
  return <div>{result}</div>;
};