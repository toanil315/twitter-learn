export default {
  name: 'tweet',
  title: 'Tweet',
  type: 'document',
  fields: [
    {
      name: 'text',
      title: 'Text in Tweet',
      type: 'string',
    },
    {
      name:'blockTweet',
      title: 'Block Tweet',
      description: 'Admin controls: toggle to block tweet',
      type: 'boolean'
    },
    {
      name: 'userName',
      title: 'User Name',
      type: 'string'
    },
    {
      name: 'profileImg',
      title: 'Profile Image',
      type: 'string'
    },
    {
      name: 'image',
      title: 'Tweet Image',
      type: 'string'
    }
  ]
}
