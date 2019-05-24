import { Toolkit } from 'actions-toolkit';
import Checker from './lib/Checker';

const options = {
  event: 'pull_request',
};

const task = async (tools) => {
  const args: any = tools.arguments;
  tools.log('@@arguments', args);

  if (args === 'release') {
    const checker = new Checker(tools);
    await checker.run();
  }

  // TODO
};

Toolkit.run(task, options);
