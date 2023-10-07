export const getUserQuery = `
query MyQuery($email:String!) {
  user(email:$email){
    id
    username
    email
  }
}`;

export const getSingleProjectQuery = `
query getProject($id:ID!) {
  getProject(id:$id){
    id
    title
    desc
    image
    category
    createdBy{
      id
      username
      email
      desc
    }
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
mutation addProject($category:String!,$title:String!,$image:String!,$desc:String!,$liveURL:String!,$githubURL:String!,$createdBy:ID!){
  addProject(category:$category,title:$title,image:$image,desc:$desc,liveURL:$liveURL,githubURL:$githubURL,createdBy:$createdBy){
    id
    title
    desc
    category
    createdBy{
      username
    }
  }
}`;

export const getProjectQuery = `
query getAllProjects($category:String) {
  getAllProjects(category:$category){
    id
    title
    desc
    image
    createdBy{
      id
      username
      email
      desc
    }
  }
}`;
