import { postgresConfig, setEnvironmentVariables } from './util/config';

setEnvironmentVariables();

// const option = {
//   transform: {
//     ...postgres.camel,
//     undefined: null,
//   },
// };

export default postgresConfig;
