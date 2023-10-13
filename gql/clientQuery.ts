// mutations

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

export const deleteProjectMutation = `
mutation deleteProject($id: ID!){
  deleteProject(id: $id) {
    id
    title
    createdAt
  }
}`;

export const editProjectMutation = `
mutation editProject($category:String,$title:String,$image:String,$desc:String,$liveURL:String,$githubURL:String,$id:ID!){
  editProject(category:$category,title:$title,image:$image,desc:$desc,liveURL:$liveURL,githubURL:$githubURL,id:$id){
    id
    title
    desc
    category
    createdBy{
      username
    }
  }
}`;

// Queries

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
    liveURL
    githubURL
    category
    createdBy{
      id
      username
      email
      desc
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
    liveURL
    githubURL
    createdBy{
      id
      username
      email
      desc
    }
  }
}`;

export const getUserProjectQuery = `
query getUserProject($id:ID,$last:Int) {
  getUserProject(id:$id,last:$last){
    id
    title
    desc
    image
    liveURL
    githubURL
     createdBy{
      id
      username
      email
      desc
    }
  }
}
`;
