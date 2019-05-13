#!/usr/bin/env node

/**
 * Copyright 2019 Google LLC. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

import {ReleasePR, ReleasePROptions} from '../release-pr';
import {CandidateIssue} from '../candidate-issue';

const yargs = require('yargs');

yargs
    .command(
        'candidate-issue',
        'create an issue that\'s an example of the next release', () => {},
        async (argv: ReleasePROptions) => {
          const ci = new CandidateIssue(argv);
          await ci.run();
        })
    .command(
        'release-pr', 'create a new release PR from a candidate issue',
        () => {},
        async (argv: ReleasePROptions) => {
          const rp = new ReleasePR(argv);
          await rp.run();
        })
    .command(
        'github-release', 'create a GitHub release from am release PR',
        () => {}, async (argv: ReleasePROptions) => {})
    .option(
        'token', {describe: 'GitHub repo token', default: process.env.GH_TOKEN})
    .option('package-name', {
      describe: 'name of package release is being minted for',
      required: true
    })
    .option(
        'repo-url',
        {describe: 'GitHub URL to generate release for', required: true})
    .option('release-as', {
      describe: 'override the semantically determined release version',
      type: 'string'
    })
    .option('release-type', {
      describe: 'what type of repo is a release being created for?',
      options: ['node'],
      default: 'node'
    })
    .option('bump-minor-pre-major', {
      describe:
          'should we bump the semver minor prior to the first major release',
      default: false,
      type: 'boolean'
    })
    .option('label', {
      default: 'autorelease: pending',
      describe: 'label to add to generated PR'
    })
    .demandCommand(1)
    .strict(true)
    .parse();
