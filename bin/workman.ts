#!/usr/bin/env node

import { Toolkit } from 'actions-toolkit';
import Checker from '../lib/Checker';
import Releaser from '../lib/Releaser';

const options = {
  secrets: [
    'GITHUB_TOKEN',
  ],
};

const task = async (tools: any) => {
  const args: any = tools.arguments;
  tools.log('@arguments', args);

  const { _: commands } = args;
  const [command = '', ] = commands || [];

  tools.log('@command', command);

  if (command === 'check') {
    const checker = new Checker();
    await checker.run(tools);
    return;
  }

  if (command === 'release') {
    const releaser = new Releaser();
    await releaser.run(tools);
    return;
  }

  tools.log('@command', 'no command found');
};

Toolkit.run(task, options);
