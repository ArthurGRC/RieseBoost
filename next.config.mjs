import { withLogtail } from '@logtail/next';

const nextConfig = {
  serverExternalPackages: ['sequelize', 'sequelize-typescript'],
};

export default withLogtail(nextConfig);
