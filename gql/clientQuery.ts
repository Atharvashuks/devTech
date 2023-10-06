export const getUserQuery = `
query MyQuery($email:String!) {
  user(email:$email){
    id
    username
    email
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

export const addProjectMutation = `
mutation addProject($title:String!,$image:String!,$desc:String!,$liveURL:String!,$githubURL:String!,$category:String!,$createdBy:ID!){
  addProject(title:$title,image:$image,desc:$desc,liveURL:$liveURL,githubURL:$githubURL,category:$category,createdBy:$createdBy){
    id
    title
    desc
    createdBy{
      username
    }
  }
}`;

// export const addProjectMutation = `
// mutation addProject($input: ProjectCreateInput!){
//   addProject(input:$input){
//     id
//     title
//     image
//     desc
//     createdBy {
// 					email
// 					name
// 				}
//   }
// }`;
