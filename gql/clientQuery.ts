export const getUserQuery = `
query MyQuery($email:String!) {
  user(email:$email){
    username
    email
    id
  }
}`;

export const createUserMutation = `
mutation addUser($username:String! $email:String!, $desc:String!) {
  addUser(username:$username, email:$email, desc:$desc){
    id
    username
    email
    desc
  }
}
`;
