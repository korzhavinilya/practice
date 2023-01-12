// pd publish action.js

// export default {
//   name: 'Action Demo',
//   description: 'This is a demo action',
//   key: 'action_demo',
//   version: '0.0.1',
//   type: 'action',
//   props: {},
//   async run() {
//     return `hello world!`;
//   },
// };

// export default {
//   name: 'Action Demo',
//   description: 'This is a demo action',
//   key: 'action_demo',
//   version: '0.0.2',
//   type: 'action',
//   props: {
//     name: {
//       type: 'string',
//       label: 'Name',
//     },
//   },
//   async run() {
//     return `hello ${this.name}!`;
//   },
// };

// import { axios } from '@pipedream/platform';

// export default {
//   name: 'Action Demo',
//   description: 'This is a demo action',
//   key: 'action_demo',
//   version: '0.0.4',
//   type: 'action',
//   props: {},
//   async run() {
//     const data = await axios(this, {
//       url: 'https://jsonplaceholder.typicode.com/users/1',
//     });
//     return `hello ${data.name}!`;
//   },
// };

import { Octokit } from '@octokit/rest';

export default {
  name: "Action Demo",
  description: "This is a demo action",
  key: "action_demo",
  version: "0.0.5",
  type: "action",
  props: {
    github: {
      type: "app",
      app: "github",
    }
  },
  async run({ $ }) {
    const octokit = new Octokit({
      auth: this.github.$auth.oauth_access_token
    })
    
    const { data } = await octokit.repos.get({
      owner: `pipedreamhq`,
      repo: `pipedream`,
    })

    $.export("$summary", `Successfully fetched info for \`${data.full_name}\``)
    
    return data;
  },
}