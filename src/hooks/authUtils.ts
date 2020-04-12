import { Auth } from "aws-amplify";

export const signOut = () => {
  Auth.signOut()
    .then(data => console.log(data))
    .catch(err => console.log(err));
};
